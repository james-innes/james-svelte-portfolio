import vendors from "$lib/data/vendors";

export function load({ params }) {
  const vendor = vendors.find((vendor) => vendor.vendorId == params.vendorId);

  return vendor;
}
