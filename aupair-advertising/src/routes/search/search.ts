import init from "$lib/db";

export default async function search(q: any) {
	const db = await init();

	const results = await db.query(
		`
  $q.nickname = null AND (
    SELECT code, images FROM profile WHERE
      AND geo::distance(coordinates, (${q.location.coordinates.lng}, ${q.location.coordinates.lat})) <= $q.location.distance * 1000
      AND services ⊇ $services
  ) OR nickname ~ $q.nickname
`,
		{ q, services: q.services.map((s: any) => s.name) }
	);

	db.close();

	return results[0].result;
}
