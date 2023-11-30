import { addDays as addDaysFromDate, parseISO } from "date-fns";
import { formatDate } from "$lib/utils";
import type { Vendor, Tour } from "$lib/types";

function addDays(tour: Tour, days: number) {
  return addDaysFromDate(parseISO(tour.tourDate), days);
}

function addDaysAndFormatDate(tour: Tour, days: number) {
  return formatDate(addDays(tour, days));
}

const vendors: Vendor[] = [
  {
    vendorId: "1",
    name: "🛏️ Hà Giang Hostel",
    bankAccount: {
      nickname: "Hà Giang Hostel",
      accountName: "Nguyen Van Viet",
      accountNumber: "34510000343489",
      bankName: "BIDV",
    },
    serviceSummary: {
      headers: ["date", "guests", "motorbike"],
      rowTransformer: (tour: Tour) => ({
        meta: {
          tourId: tour.id,
          vendorDate: addDays(tour, 0),
        },
        columns: [
          addDaysAndFormatDate(tour, 0),
          tour.totalGuests,
          tour.selfDrive,
        ],
      }),
    },
    purchaseOrder: (tour: Tour) => [
      {
        itemName: "singleBed",
        unitType: "",
        unitPrice: 200000,
        quantity: tour.totalGuests,
      },
      {
        itemName: "breakfast",
        unitType: "",
        unitPrice: 0,
        quantity: tour.totalGuests,
      },
      {
        itemName: "hondaWave",
        unitType: "200.000 x 3 Ngày",
        unitPrice: 600000,
        quantity: tour.selfDrive,
      },
      {
        itemName: "extraProtection",
        unitType: "100.000 x 3 Ngày",
        unitPrice: 300000,
        quantity: tour.selfDrive,
      },
      {
        itemName: "fullFuelTank",
        unitType: "80.000 x 3 Ngày",
        unitPrice: 240000,
        quantity: tour.selfDrive,
      },
      {
        itemName: "insurance",
        unitType: "80.000 x 3 Ngày",
        unitPrice: 240000,
        quantity: tour.selfDrive,
      },
    ],
  },
  {
    vendorId: "2",
    name: "🕵️‍♂️ Ket (Lái chính trong đoàn)",
    bankAccount: {
      nickname: "Ket (Lái chính trong đoàn)",
      accountName: "DINH VAN KET",
      accountNumber: "199538366666",
      bankName: "Military Bank",
    },
    serviceSummary: {
      headers: ["date", "easyRider", "selfDrive"],
      rowTransformer: (tour: Tour) => ({
        meta: {
          tourId: tour.id,
          vendorDate: addDays(tour, 1),
        },
        columns: [
          addDaysAndFormatDate(tour, 1),
          tour.easyRider,
          tour.selfDrive,
        ],
      }),
    },
    purchaseOrder: (tour: Tour) => [
      {
        itemName: "coDriver",
        unitType: "",
        unitPrice: 0,
        quantity: 0,
      },
      {
        itemName: "driverHireThreeDays",
        unitType: "",
        unitPrice: 1500000,
        quantity: tour.easyRider,
      },
      {
        itemName: "meals",
        unitType: "50.000 x 7",
        unitPrice: 350000,
        quantity: tour.easyRider,
      },
      {
        itemName: "fuel",
        unitType: "",
        unitPrice: 200000,
        quantity: tour.easyRider,
      },
      {
        itemName: "activities",
        unitType: "",
        unitPrice: 0,
        quantity: 0,
      },
      {
        itemName: "lungKhuyCaveTicket",
        unitType: "",
        unitPrice: 30000,
        quantity: tour.totalGuests,
      },
      {
        itemName: "kingMeoMansionFee",
        unitType: "",
        unitPrice: 30000,
        quantity: tour.totalGuests,
      },
      {
        itemName: "lungCuFlagpoleParkingFee",
        unitType: "",
        unitPrice: 30000,
        quantity: tour.totalGuests,
      },
      {
        itemName: "valleyBoatFee",
        unitType: "",
        unitPrice: 120000,
        quantity: tour.totalGuests,
      },
      {
        itemName: "additionalFees",
        unitType: "",
        unitPrice: 0,
        quantity: 0,
      },
      {
        itemName: "additionalDriverHire",
        unitType: "",
        unitPrice: 500000,
        quantity: tour.selfDrive,
      },
      {
        itemName: "fuel",
        unitType: "200.000 - 80.000",
        unitPrice: 120000,
        quantity: tour.selfDrive,
      },
    ],
  },
  {
    vendorId: "3",
    name: "🛏️ Đồng Văn B&B",
    bankAccount: {
      nickname: "Đồng Văn B&B",
      accountName: "vũ lệ thu",
      accountNumber: "105896116666",
      bankName: "Vietnbank",
    },
    serviceSummary: {
      headers: ["date", "guests", "vegetarian", "easyDriver"],
      rowTransformer: (tour: Tour) => ({
        meta: {
          tourId: tour.id,
          vendorDate: addDays(tour, 1),
        },
        columns: [
          addDaysAndFormatDate(tour, 1),
          tour.totalGuests,
          tour.vegetarian,
          tour.easyRider,
        ],
      }),
    },
    purchaseOrder: (tour: Tour) => [
      {
        itemName: "singleBedForGuest",
        unitType: "",
        unitPrice: 100000,
        quantity: tour.totalGuests,
      },
      {
        itemName: "breakfastForGuest",
        unitType: "",
        unitPrice: 50000,
        quantity: tour.totalGuests,
      },
      {
        itemName: "dinnerForGuest",
        unitType: "",
        unitPrice: 100000,
        quantity: tour.totalGuests,
      },
      {
        itemName: "singleBedForDriver",
        unitType: "",
        unitPrice: 100000,
        quantity: tour.easyRider,
      },
      {
        itemName: "breakfastForDriver",
        unitType: "",
        unitPrice: 0,
        quantity: tour.easyRider,
      },
      {
        itemName: "dinnerForDriver",
        unitType: "",
        unitPrice: 50000,
        quantity: tour.easyRider,
      },
    ],
  },
  {
    vendorId: "4",
    name: "🛏️ Little Yen's Homestay",
    bankAccount: {
      nickname: "Little Yen's Homestay",
      accountName: "SUNG MY YEN",
      accountNumber: "8203215024545",
      bankName: "Agribank",
    },
    serviceSummary: {
      headers: ["date", "guests", "vegetarian", "easyRider"],
      rowTransformer: (tour: Tour) => ({
        meta: {
          tourId: tour.id,
          vendorDate: addDays(tour, 2),
        },
        columns: [
          addDaysAndFormatDate(tour, 2),
          tour.totalGuests,
          tour.vegetarian,
          tour.easyRider,
        ],
      }),
    },
    purchaseOrder: (tour: Tour) => [
      {
        itemName: "discountedSingleBedForGuest",
        unitType: "200.000 - 15% = 170.000",
        unitPrice: 170000,
        quantity: tour.totalGuests,
        totalAmount: 1190000,
      },
      {
        itemName: "breakfastForGuest",
        unitType: "",
        unitPrice: 0,
        quantity: tour.totalGuests,
        totalAmount: 0,
      },
      {
        itemName: "dinnerForGuest",
        unitType: "",
        unitPrice: 100000,
        quantity: tour.totalGuests,
        totalAmount: 700000,
      },
      {
        itemName: "freeSingleBedForDriver",
        unitType: "miễn phí cho tài xế",
        unitPrice: 0,
        quantity: Math.min(tour.easyRider, 2),
        totalAmount: 0,
      },
      {
        itemName: "chargedSingleBedForDriver",
        unitType: "",
        unitPrice: 100000,
        quantity: tour.easyRider - Math.min(tour.easyRider, 2),
        totalAmount: 400000,
      },
      {
        itemName: "breakfastForDriver",
        unitType: "",
        unitPrice: 0,
        quantity: tour.easyRider,
        totalAmount: 0,
      },
      {
        itemName: "dinnerForDriver",
        unitType: "",
        unitPrice: 80000,
        quantity: tour.easyRider,
        totalAmount: 480000,
      },
    ],
  },
  {
    vendorId: "5",
    name: "🍜 Yên Minh Quán",
    bankAccount: {
      nickname: "Yên Minh Quán",
      accountName: "Trần Thị Vân Anh",
      accountNumber: "106826031986",
      bankName: "Viettinbank",
    },
    serviceSummary: {
      headers: ["date", "eatsMeat", "vegetarian"],
      rowTransformer: (tour: Tour) => ({
        meta: {
          tourId: tour.id,
          vendorDate: addDays(tour, 1),
        },
        columns: [
          addDaysAndFormatDate(tour, 1),
          tour.totalGuests - tour.vegetarian,
          tour.vegetarian,
        ],
      }),
    },
    purchaseOrder: (tour: Tour) => [
      {
        itemName: "lunchForGuest",
        unitType: "",
        unitPrice: 70000,
        quantity: tour.totalGuests,
        totalAmount: 490000,
      },
    ],
  },
  {
    vendorId: "6",
    name: "🍜 Đồng Văn Quán",
    bankAccount: {
      nickname: "Đồng Văn Quán",
      accountName: "PHAM VAN TIEU",
      accountNumber: "8202205002572",
      bankName: "Agribank",
    },
    serviceSummary: {
      headers: ["date", "eatsMeat", "vegetarian"],
      rowTransformer: (tour: Tour) => ({
        meta: {
          tourId: tour.id,
          vendorDate: addDays(tour, 2),
        },
        columns: [
          addDaysAndFormatDate(tour, 2),
          tour.totalGuests - tour.vegetarian,
          tour.vegetarian,
        ],
      }),
    },
    purchaseOrder: (tour: Tour) => [
      {
        itemName: "lunchForGuest",
        unitType: "",
        unitPrice: 80000,
        quantity: tour.totalGuests,
        totalAmount: 560000,
      },
    ],
  },
  {
    vendorId: "7",
    name: "🍜 T.T Pác Miầu Quán",
    bankAccount: {
      nickname: "T.T Pác Miầu Quán",
      accountName: "Ma Thị Quy",
      accountNumber: "8301205062632",
      bankName: "Agribank",
    },
    serviceSummary: {
      headers: ["date", "eatsMeat", "vegetarian"],
      rowTransformer: (tour: Tour) => ({
        meta: {
          tourId: tour.id,
          vendorDate: addDays(tour, 3),
        },
        columns: [
          addDaysAndFormatDate(tour, 3),
          tour.totalGuests - tour.vegetarian,
          tour.vegetarian,
        ],
      }),
    },
    purchaseOrder: (tour: Tour) => [
      {
        itemName: "lunchForGuest",
        unitType: "",
        unitPrice: 70000,
        quantity: tour.totalGuests,
        totalAmount: 490000,
      },
    ],
  },
  {
    vendorId: "8",
    name: "🍜 Mộc Miên Quán",
    bankAccount: {
      nickname: "Mộc Miên Quán",
      accountName: "NGUYEN DUC MANH",
      accountNumber: "31000276480",
      bankName: "VietcomBank",
    },
    serviceSummary: {
      headers: ["date", "eatsMeat", "vegetarian"],
      rowTransformer: (tour: Tour) => ({
        meta: {
          tourId: tour.id,
          vendorDate: addDays(tour, 3),
        },
        columns: [
          addDaysAndFormatDate(tour, 3),
          tour.totalGuests - tour.vegetarian,
          tour.vegetarian,
        ],
      }),
    },
    purchaseOrder: (tour: Tour) => [
      {
        itemName: "dinnerForGuest",
        unitType: "",
        unitPrice: 83000,
        quantity: tour.totalGuests,
        totalAmount: 581000,
      },
    ],
  },
  {
    vendorId: "9",
    name: "🚌 Nhà Xe Quang Nghị",
    bankAccount: {
      nickname: "Nhà Xe Quang Nghị",
      accountName: "Nguyen van nghi",
      accountNumber: "104001603289",
      bankName: "VietinBank",
    },
    serviceSummary: {
      headers: ["guests", "depart", "return"],
      rowTransformer: (tour: Tour) => ({
        meta: {
          tourId: tour.id,
          vendorDate: addDays(tour, 0),
        },
        columns: [
          tour.totalGuests,
          addDaysAndFormatDate(tour, 0),
          addDaysAndFormatDate(tour, 3),
        ],
      }),
    },
    purchaseOrder: (tour: Tour) => [
      {
        itemName: "bedBusHanoiToHaGiang",
        unitType: "Chỗ",
        unitPrice: 225000,
        quantity: tour.totalGuests,
        totalAmount: 1575000,
      },
      {
        itemName: "bedBusHaGiangToHanoi",
        unitType: "Chỗ",
        unitPrice: 225000,
        quantity: tour.totalGuests,
        totalAmount: 1575000,
      },
    ],
  },
];

export default vendors;
