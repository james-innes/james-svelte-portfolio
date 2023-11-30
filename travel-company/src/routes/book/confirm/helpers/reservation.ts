import type { Guest, TourDateOption, Tour } from "$lib/types";
import calculateGuestTotals from "./calculateGuestTotals";
import initDb from "$lib/client/db";

const db = await initDb();

export async function createTour(
  tourDateOption: TourDateOption,
  newGuests: Guest[]
): Promise<Tour> {
  const newTourTemplate: Omit<Tour, "id"> = {
    tourDate: tourDateOption.tourDate,
    ...calculateGuestTotals(newGuests),
    whatsappGroupId: null,
    guests: newGuests,
  };

  const createTourResult = await db.query(
    "CREATE tour CONTENT $newTourTemplate",
    { newTourTemplate }
  );

  // @ts-ignore
  const newTour = createTourResult[0].result[0];

  await db.query("UPDATE tourDateOption SET tourId = $tourId", {
    tourId: newTour.id,
  });

  return newTour;
}

export async function updateTour(
  tourDateOption: TourDateOption,
  newGuests: Guest[]
): Promise<Tour> {
  const newGuestTotals = calculateGuestTotals(newGuests);

  const updatedTourResult = await db.query(
    `UPDATE $tourId SET totalGuests += $totalGuests, easyRider += $easyRider, selfDrive += $selfDrive, vegetarian += $vegetarian, guests += $newGuests`,
    {
      tourId: tourDateOption.tourId,
      ...newGuestTotals,
      newGuests,
    }
  );

  return updatedTourResult[0].result[0];
}
