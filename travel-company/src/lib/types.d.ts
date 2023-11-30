export type TourDateOption = {
  tourId: string | null;
  tourDate: string;
};

export type Tour = {
  id: string;
  tourDate: string;
  totalGuests: number;
  easyRider: number;
  selfDrive: number;
  vegetarian: number;
  whatsappGroupId: string | null;
  guests: Guest[];
};

export type Guest = {
  guestName: string;
  drivingChoice: "selfDrive" | "easyRider";
  isVegetarian: boolean;
  hasGivenPassport: boolean;
  whatsApp: string;
  addedOnWhatsApp: boolean;
  email: string;
  wixBookingId: string | null;
};

export type Vendor = {
  vendorId: string;
  name: string;
  bankAccount: BankAccount;
  serviceSummary: ServiceSummary;
  purchaseOrder: (tour: Tour) => PurchaseOrderRow[];
};

type BankAccount = {
  nickname: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
};

type ServiceSummary = {
  headers: string[];
  rowTransformer: (tour: Tour) => {
    meta: any;
    columns: (string | number)[];
  };
};

type PurchaseOrderRow = {
  itemName: string;
  unitType: string;
  unitPrice: number;
  quantity: number;
};

export type Transaction = {
  amount: number;
  receivingVendorId: string;
  forTourId: string;
};

export type UnconfirmedCheckout = {
  tourDateOption: TourDateOption;
  newGuests: Guest[];
  vnp_Amount: number;
  confirmed: boolean;
};

export type AutomatedMessage = {
  index: number;
  description: string;
  message: string;
  tourDateOffset: number;
  time: { hours: number; minutes: number };
  start: string | null;
  end: string | null;
  duration: string | null;
};
