import { SURREAL_URL } from "$env/static/private";
const { NODE_ENV } = import.meta.env;
import Surreal from "surrealdb.js";

export default async function initDb() {
  const db = new Surreal(SURREAL_URL);

  await db.signin({
    user: "root",
    pass: "root",
  });

  const database = NODE_ENV == "production" ? "travel-company-prod" : "travel-company-dev";

  await db.use("travel-company", database);
  return db;
}
