export type Rate = {
	duration: string;
	rate: number;
};

export type Rates = {
	in: Rate[];
	out: Rate[];
};

export type Rating = {
	score: number;
	positive: number;
	negative: number;
	neutral: number;
	new: number;
	first: number;
};

export type Review = {
	feeling: "positive" | "negative" | "neutral";
	when: number;
	comment: string;
};

export type Faq = {
	question: string;
	answer: string;
};

export type Interview = {
	question: string;
	answer: string;
};

export type Video = {
	src: string;
	title: string;
};

export type Gallery = string;

export type Profile = {
	code: string;
	phone: string;
	email?: string;
	info: Info;
	interview: Interview[] | [];
	faq: Faq[] | [];
	rates: Rates;
	services: string[];
	nationality: string; // ISO2
	verified: boolean;
	availableToday: boolean;
	memberSince: number;
	lastLoggedIn: number;
	views: number;
	hasGallery: boolean;
	gallery: Gallery[];
	video: Video[];
	images: string[];
	coordinates: number[];
	address: string;
	details: string;
	summary: string;
	rating: Rating[] | [];
	review: Review[] | [];
	updated: number;
};
