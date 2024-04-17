import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("book-review");
    const books = await db.collection("books").find().toArray();
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    return error;
  }
};
