import "dotenv/config";
import Surreal from "surrealdb.js";

import tour from "../fixtures/tour";
import tourDateOption from "../fixtures/tourDateOption";
import transaction from "../fixtures/transaction";
import automatedMessage from "../fixtures/automatedMessage";

async function deleteTables(db: any) {
  await db.delete("tour");
  await db.delete("tourDateOption");
  await db.delete("transaction");
  await db.delete("unconfirmedCheckout");
  await db.delete("automatedMessage");
}

async function insertTables(db: any) {
  await db.query("INSERT INTO tour $tour", { tour });
  await db.query("INSERT INTO tourDateOption $tourDateOption", {
    tourDateOption,
  });
  await db.query("INSERT INTO transaction $transaction", { transaction });
  await db.query("INSERT INTO automatedMessage $automatedMessage", {
    automatedMessage,
  });
}

async function seedFixtures() {
  const db = new Surreal(process.env.SURREAL_URL);

  await db.signin({
    user: "root",
    pass: "root",
  });

  await db.use("travel-company", "travel-company-dev");

  await deleteTables(db);
  await insertTables(db);

  db.close();
}

export default seedFixtures;
