import type { PageServerLoad } from "../$types";
import vendors from "$lib/data/vendors";
import { getTours, getTransactions } from "$lib/queryFunction";

export const load: PageServerLoad = async ({ params }) => {
  const transactions = await getTransactions();
  const tours = await getTours();

  const tour = tours.find((tour) => tour.id == params.tourId);

  const vendor = vendors.find((vendor) => vendor.vendorId == params.vendorId);

  return {
    vendorId: vendor.vendorId,
    guests: tour?.guests || [],
    purchaseOrder: vendor.purchaseOrder(tour),
    transactions: transactions.filter(
      (t) =>
        t.receivingVendorId == params.vendorId && t.forTourId == params.tourId
    ),
    tour,
  };
};
