import { derived, writable } from "svelte/store";

import en from "./locales/en.js";
import vi from "./locales/vi.js";

export const locales = [
  {
    name: "English",
    isoLanguageCode: "en",
    isoCountryCode: "GB",
    emoji: "🇬🇧",
    data: en,
  },
  {
    name: "Tiếng Việt",
    isoLanguageCode: "vi",
    isoCountryCode: "VN",
    emoji: "🇻🇳",
    data: vi,
  },
];

export let locale = writable("vi");

let t = derived(
  locale,
  ($locale) =>
    locales.find((l) => l.isoLanguageCode == $locale)?.data || locales[0].data
);

export default t;

export let displayCurrency = writable("GBP");
