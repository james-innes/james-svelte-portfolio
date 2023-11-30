import Surreal from "surrealdb.js";

export default async function init() {
	const db = new Surreal("database address");

	await db.signin({
		user: "root",
		pass: "root",
	});

	await db.use("website-name", "website-name");
	return db;
}
