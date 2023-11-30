import initDb from "$lib/client/db";
import type { Guest, Tour } from "$lib/types";
import whatsapp from "$lib/client/whatsapp";
import { format, parseISO } from "date-fns";
import * as Sentry from "@sentry/node";

const db = await initDb();

async function createNewGroup(tour: Tour): Promise<string> {
  const tourDate = tour.tourDate;

  const groupChatName = `Travel Company ⛰️🏍️ ${format(parseISO(tourDate), "dd/MM/yy")}`;

  const createdGroup = await whatsapp.createGroup(
    groupChatName,
    "picture-url"
  );
  const groupId = createdGroup.groupId;

  await db.query("UPDATE $tourId SET whatsappGroupId = $groupId", {
    tourId: tour.id,
    groupId,
  });

  return groupId;
}

async function addGuestsToGroup(
  groupId: string,
  guests: Guest[],
  tourId: string
) {
  for (const guest of guests) {
    try {
      await whatsapp.addGuestToGroup(groupId, [guest.whatsApp]);
      await db.query(
        "UPDATE $tourId SET guests[WHERE guestName = $guestName].addedOnWhatsApp = true;",
        { tourId, guestName: guest.guestName }
      );
    } catch (error) {
      Sentry.withScope(() => {
        Sentry.setExtra("description", "trying to add guest to whatsapp group");
        Sentry.setExtra("guest", guests);
        Sentry.setExtra("groupId", groupId);
        Sentry.setExtra("tourId", tourId);
        Sentry.captureException(error);
      });
    }
  }
}

export default async function whatsappOnboarding(
  tour: Tour,
  newGuests: Guest[]
) {
  var groupId = tour.whatsappGroupId;

  if (groupId == null) {
    groupId = await createNewGroup(tour);
  }

  await addGuestsToGroup(groupId, newGuests, tour.id);
}
