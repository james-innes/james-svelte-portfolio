import type { RequestHandler } from "./$types";
import type { RequestEvent } from "@sveltejs/kit";
import { prices } from "$lib/data/constants";
import type { Guest, UnconfirmedCheckout } from "$lib/types";
import initDb from "$lib/client/db";
import initVnpay from "$lib/client/vnpay";

const db = await initDb();
const vnpay = await initVnpay();

export const POST: RequestHandler = async (event: RequestEvent) => {
  const { tourDateOption, newGuests } = await event.request.json();

  const vnp_Amount = newGuests.reduce(
    (total: number, guest: Guest) =>
      total +
      (guest.drivingChoice === "easyRider"
        ? prices.EASY_RIDER
        : prices.SELF_DRIVE),
    0
  );

  const unconfirmedCheckout: UnconfirmedCheckout = {
    tourDateOption,
    newGuests,
    vnp_Amount,
    confirmed: false,
  };

  const { id } = await db.create("unconfirmedCheckout", unconfirmedCheckout);

  var paymentUrl = "";

  paymentUrl = await vnpay.buildPaymentUrl({
    vnp_Amount,
    vnp_IpAddr: event.getClientAddress(),
    vnp_TxnRef: id,
    vnp_OrderInfo: "Payment",
  });

  return new Response(JSON.stringify({ paymentUrl }), {
    status: 200,
  });
};
