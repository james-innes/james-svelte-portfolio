import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Vendor, Tour } from "$lib/types";
import vendors from "$lib/data/vendors";
import { getTours } from "$lib/queryFunction";

export const load: PageServerLoad = async ({ params }) => {
  const vendor: Vendor | undefined = vendors.find(
    (vendor) => vendor.vendorId == params.vendorId
  );

  if (!vendor) {
    throw error(404, "Vendor not found");
  }

  const tours = await getTours();

  const serviceSummaryRows = tours.map((tour: Tour) =>
    vendor.serviceSummary.rowTransformer(tour)
  );

  const sortedServiceSummaryRows = serviceSummaryRows.sort((a: any, b: any) => {
    const dateA = new Date(a.meta.vendorDate);
    const dateB = new Date(b.meta.vendorDate);
    return dateA.getTime() - dateB.getTime();
  });

  return {
    vendorId: vendor.vendorId,
    vendorName: vendor.name,
    headers: vendor?.serviceSummary.headers,
    rows: sortedServiceSummaryRows,
  };
};
