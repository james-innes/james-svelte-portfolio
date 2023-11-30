import { intervalToDuration, fromUnixTime, formatDuration } from "date-fns";
import Case from "case";

export const when = (timestamp: number) => {
	if (!timestamp || isNaN(timestamp)) {
		return "timestamp";
	}

	const duration = intervalToDuration({
		start: new Date(fromUnixTime(timestamp)),
		end: new Date(),
	});

	const durationString =
		formatDuration(duration, {
			format: ["years", "months", "weeks"],
			delimiter: ",  ",
		}) || "This week";

	return Case.capital(durationString);
};

export const fuzzySearch = (search: string, text: string) =>
	search
		? search
				.toLowerCase()
				.trim()
				.split(" ")
				.some(t => text.toLowerCase().includes(t))
		: true;
