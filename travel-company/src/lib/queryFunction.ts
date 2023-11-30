import type { Tour, Transaction } from "$lib/types";
import initDb from "$lib/client/db";

async function getTable(tableName: string) {
  const db = await initDb();
  const queryResult = await db.query(`SELECT * FROM ${tableName}`);
  return queryResult[0].result;
}

export async function getTours(): Promise<Tour[]> {
  const tours = await getTable("tour");
  return tours;
}

export async function getTransactions(): Promise<Transaction[]> {
  const transactions = await getTable("transaction");
  return transactions;
}

export async function getTourDateOptions(): Promise<[]> {
  const tourDateOptions = await getTable("tourDateOption");
  return tourDateOptions;
}
