import { derived, writable } from "svelte/store";

import en from "./locales/en.js";
import ha from "./locales/ha.js";

export const locales = [
	{
		name: "English",
		isoLanguageCode: "en",
		isoCountryCode: "GB",
		emoji: "🇬🇧",
		data: en,
	},
];

export let locale = writable("en");

let t = derived(
	locale,
	$locale =>
		locales.find(l => l.isoLanguageCode == $locale)?.data || locales[0].data
);

export default t;

export let displayCurrency = writable("GBP");
