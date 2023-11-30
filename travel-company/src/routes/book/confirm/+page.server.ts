import type { PageServerLoad } from "./$types";
import type { Tour } from "$lib/types";

import whatsappOnboarding from "./helpers/whatsapp";
import sendWelcomeEmail from "./helpers/email";
import confirmPayment from "./helpers/payment";
import getUnconfirmedCheckout from "./helpers/getUnconfirmedCheckout";
import { createTour, updateTour } from "./helpers/reservation";

import initDb from "$lib/client/db";
const db = await initDb();

export const load: PageServerLoad = async ({ url }) => {
  const paymentConfirmation = await confirmPayment(url);

  const { tourDateOption, newGuests, confirmed } = await getUnconfirmedCheckout(
    paymentConfirmation.vnp_TxnRef
  );

  if (confirmed == false && paymentConfirmation.isSuccess) {
    const tour: Tour = tourDateOption.tourId
      ? await updateTour(tourDateOption, newGuests)
      : await createTour(tourDateOption, newGuests);

    await whatsappOnboarding(tour, newGuests);

    newGuests.forEach(async (guest) => {
      await sendWelcomeEmail(tourDateOption.tourDate, guest);
    });

    await db.query("UPDATE $unconfirmedCheckoutId SET confirmed = true", {
      unconfirmedCheckoutId: paymentConfirmation.vnp_TxnRef,
    });
  }

  return { ...paymentConfirmation };
};
