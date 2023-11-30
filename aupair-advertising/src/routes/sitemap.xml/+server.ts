import init from "$lib/db";

const db = await init();

export const GET = async () => {
	const profileIds: { code: string }[] = await db.query(
		"SELECT code FROM profile"
	);

	const profilePages = profileIds
		.map(record => record.code)
		.map(
			profileId => `
   <url>
      <loc>https://www.website-name.com/${profileId}</loc>
      <changefreq>daily</changefreq>
   </url>`
		)
		.join("");

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
          <loc>https://www.website-name.com</loc>
          <priority>1</priority>
          <changefreq>weekly</changefreq>
       </url>
       ${profilePages}
    </urlset>
    `;

	return new Response(sitemap, {
		headers: {
			"Content-Type": "application/xml",
		},
	});
};
