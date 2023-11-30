import { fromUnixTime, formatISO } from "date-fns";
import type { Profile, Review, Rate, Rating } from "$lib/types/Profile";
import type { Product, WithContext, AggregateOffer } from "schema-dts";

const feelingToStars = (feeling: Review["feeling"]) => {
	switch (feeling) {
		case "negative":
			return 1;
		case "neutral":
			return 3;
		case "positive":
			return 5;
	}
};

const firstFewWords = (str: string, n: number) =>
	str.split(" ").slice(0, n).join(" ");

const offerLeaseLength = (rateDuration: string) => {
	switch (rateDuration) {
		case "15 mins":
			return { value: 15, unitCode: "MIN" };
		case "½ Hour":
			return { value: 30, unitCode: "MIN" };
		case "1 Hour":
			return { value: 1, unitCode: "HUR" };
		case "1½ Hours":
			return { value: 1.5, unitCode: "HUR" };
		case "2 Hours":
			return { value: 2, unitCode: "HUR" };
		case "3 Hours":
			return { value: 3, unitCode: "HUR" };
		case "4 Hours":
			return { value: 4, unitCode: "HUR" };
	}
};

export default function (p: Profile) {
	const offers: AggregateOffer = {
		"@type": "AggregateOffer",
		acceptedPaymentMethod: {
			"@type": "PaymentMethod",
			name: "http://purl.org/goodrelations/v1#ByInvoice",
		},
		priceCurrency: p.info.currency,
		availability: p.availableToday
			? "https://schema.org/InStock"
			: "https://schema.org/PreOrder",
		offerCount: p.rates.in?.length + p.rates.out?.length,
		advanceBookingRequirement: {
			"@type": "QuantitativeValue",
			value: 1,
			unitCode: "HUR",
		},
		offers: p.rates.in.map((r: Rate) => ({
			"@type": "OfferForLease",
			price: r.rate,
			businessFunction: {
				"@type": "BusinessFunction",
				name: "http://purl.org/goodrelations/v1#ProvideService",
			},
			leaseLength: {
				"@type": "QuantitativeValue",
				...offerLeaseLength(r.duration),
			},
		})),
	};

	const product: WithContext<Product> = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: p.nickname,
		image: p.images,
		description: p.details,
		sku: p.code,
		brand: {
			"@type": "Brand",
			name: "Website-Name",
		},
		audience: {
			"@type": "PeopleAudience",
			audienceType: "https://schema.org/People",
			geographicArea: {
				"@type": "Country",
				name: "United Kingdom",
			},
		},
		review: p.review.map((r: Review) => ({
			"@type": "UserReview",
			datePublished: formatISO(fromUnixTime(r.when)),
			name: firstFewWords(r.comment, 5),
			reviewBody: r.comment,
			reviewRating: {
				"@type": "Rating",
				bestRating: "5",
				ratingValue: feelingToStars(r.feeling),
				worstRating: "1",
			},
		})),
		aggregateRating: p.rating.map((r: Rating) => ({
			"@type": "AggregateRating",
			ratingValue: r.score,
			reviewCount: r.positive + r.neutral + r.negative,
		})),
		offers,
	};

	return `<script type="application/ld+json">${JSON.stringify(
		product,
		null,
		2
	)}</script>`;
}
