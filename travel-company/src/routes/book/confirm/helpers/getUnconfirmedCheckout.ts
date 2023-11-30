import type { UnconfirmedCheckout } from "$lib/types";
import initDb from "$lib/client/db";
const db = await initDb();

async function getUnconfirmedCheckout(
  unconfirmedCheckoutId: string
): Promise<UnconfirmedCheckout> {
  if (!unconfirmedCheckoutId) {
    throw new Error("Invalid unconfirmedCheckoutId");
  }

  try {
    const unconfirmedCheckoutResult = await db.query(
      "SELECT * FROM $unconfirmedCheckoutId",
      {
        unconfirmedCheckoutId,
      }
    );

    // @ts-ignore
    return unconfirmedCheckoutResult[0].result[0];
  } catch (error) {
    console.error("Failed to get unconfirmed checkout:", error);
    throw error;
  }
}

export default getUnconfirmedCheckout;
