import type { Guest } from "$lib/types";

function calculateGuestTotals(newGuests: Guest[]) {
  const totalGuests = newGuests.length;
  const easyRider = newGuests.filter(
    (guest) => guest.drivingChoice == "easyRider"
  ).length;
  const selfDrive = totalGuests - easyRider;
  const vegetarian = newGuests.filter((guest) => guest.isVegetarian).length;

  return { totalGuests, easyRider, selfDrive, vegetarian };
}

export default calculateGuestTotals;