import type { Guest } from "../../src/lib/types";

const newGuests: Record<string, Guest> = {
  merritt: {
    guestName: "Merritt Jaskolski",
    drivingChoice: "selfDrive",
    isVegetarian: false,
    hasGivenPassport: false,
    whatsApp: "+44 1234567899",
    addedOnWhatsApp: false,
    email: "merritt2@ethereal.email",
    wixBookingId: null,
  },
  kian: {
    guestName: "Kian Leuschke",
    drivingChoice: "easyRider",
    isVegetarian: false,
    hasGivenPassport: false,
    whatsApp: "+44 1234567899",
    addedOnWhatsApp: false,
    email: "kian.leuschke31@ethereal.email",
    wixBookingId: null,
  },
};

export default newGuests;
