import type { TourDateOption } from "../../src/lib/types";
import mockDate from "../helpers/mockDate";

const tourDateOption: TourDateOption[] = [
  {
    // Two days ago
    tourId: "tour:one",
    tourDate: mockDate(-2, 0),
  },
  {
    // Yesterday
    tourId: "tour:two",
    tourDate: mockDate(-1, 0),
  },
  {
    // Today
    tourId: "tour:three",
    tourDate: mockDate(0, 0),
  },
  {
    // Tomorrow
    tourId: "tour:four",
    tourDate: mockDate(1, 0),
  },
  {
    // Two days from now
    tourId: "tour:five",
    tourDate: mockDate(2, 0),
  },
  {
    tourId: null,
    tourDate: mockDate(7, 0),
  },
  {
    tourId: null,
    tourDate: mockDate(14, 0),
  },
];

export default tourDateOption;
