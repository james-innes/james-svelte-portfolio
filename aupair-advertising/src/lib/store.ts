import { writable } from "svelte/store";

export const q = writable({
	hasGallery: false,
	rate: {
		duration: "1 Hour",
		max: 160,
	},
	location: {
		distance: 10,
		coordinates: { lat: 51.51291, lng: -0.14574 },
	},
	nickname: null,
	availableToday: false,
	country: "GB",
});

export const user = writable({
	id: null,
});

function chooseTheme() {
	const { subscribe, set, update } = writable("light");

	return {
		subscribe,
		choose: (chosen: "light" | "dark") =>
			update(() => {
				window.localStorage.setItem("theme", chosen);
				document.documentElement.setAttribute("data-theme", chosen);
				document
					.querySelector('meta[name="theme-color"]')!
					.setAttribute("content", chosen == "dark" ? "#000" : "#fff");
				return chosen;
			}),
		reset: () => set("light"),
	};
}

export const theme = chooseTheme();
