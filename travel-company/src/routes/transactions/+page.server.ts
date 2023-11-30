import type { PageServerLoad } from "./$types";
import vendors from "$lib/data/vendors";
import { getTours, getTransactions } from "$lib/queryFunction";

export const load: PageServerLoad = async () => {
  const tours = await getTours();
  const transactions = await getTransactions();

  const enrichedTransactions = transactions.map((trans) => ({
    ...trans,
    ...vendors.find((vendor) => vendor.vendorId == trans.receivingVendorId)
      ?.bankAccount,
    tourDate: tours.find((tour) => tour.id == trans.forTourId)?.tourDate,
  }));

  return { transactions: enrichedTransactions };
};
