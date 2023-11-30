import type { Transaction } from "../../src/lib/types";

const transaction: Transaction[] = [
  {
    amount: 100000,
    receivingVendorId: "4",
    forTourId: "tour:one",
  },
  {
    amount: 200000,
    receivingVendorId: "1",
    forTourId: "tour:one",
  },
];

export default transaction;
