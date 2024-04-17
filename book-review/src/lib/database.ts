import { Db } from "mongodb";
import clientPromise from "./mongodb";
export async function dbconnection() {
  const client = await clientPromise;
  const db: Db = client.db("book-review");
  return db;
}
