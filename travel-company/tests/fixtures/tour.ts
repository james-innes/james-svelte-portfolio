import type { Tour } from "../../src/lib/types";
import tourDateOption from "./tourDateOption";

function tourDate(tourId: string) {
  const tourDate = tourDateOption.find(
    (tourDateOption) => tourDateOption.tourId === "tour:" + tourId
  )?.tourDate;

  if (tourDate == null) {
    throw new Error(`Tour date not found for tour ${tourId}`);
  }

  return tourDate;
}

const tour: Tour[] = [
  {
    id: "tour:one",
    tourDate: tourDate("one"),
    totalGuests: 2,
    easyRider: 2,
    selfDrive: 0,
    vegetarian: 0,
    whatsappGroupId: "not a real group id",
    guests: [
      {
        guestName: "John Doe",
        drivingChoice: "easyRider",
        isVegetarian: false,
        hasGivenPassport: true,
        whatsApp: "+44 1234567899",
        addedOnWhatsApp: false,
        email: "John.Doe@domain.com",
        wixBookingId: null,
      },
      {
        guestName: "Jane Smith",
        drivingChoice: "easyRider",
        isVegetarian: false,
        hasGivenPassport: true,
        whatsApp: "+44 1234567899",
        addedOnWhatsApp: false,
        email: "Jane.Smith@domain.com",
        wixBookingId: null,
      },
    ],
  },
  {
    id: "tour:two",
    tourDate: tourDate("two"),
    totalGuests: 1,
    easyRider: 0,
    selfDrive: 1,
    vegetarian: 0,
    whatsappGroupId: "not a real group id",
    guests: [
      {
        guestName: "Eric Cartman",
        drivingChoice: "selfDrive",
        isVegetarian: false,
        hasGivenPassport: true,
        whatsApp: "+44 1234567899",
        addedOnWhatsApp: false,
        email: "Eric.Cartman@domain.com  ",
        wixBookingId: null,
      },
    ],
  },
  {
    id: "tour:three",
    tourDate: tourDate("three"),
    totalGuests: 1,
    easyRider: 0,
    selfDrive: 1,
    vegetarian: 1,
    whatsappGroupId: "not a real group id",
    guests: [
      {
        guestName: "Hannah Smith",
        drivingChoice: "selfDrive",
        isVegetarian: true,
        hasGivenPassport: true,
        whatsApp: "+44 1234567899",
        addedOnWhatsApp: false,
        email: "Hannah.Smith@domain.com",
        wixBookingId: null,
      },
    ],
  },
];

export default tour;
