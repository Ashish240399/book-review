import { dbconnection } from "@/lib/database";
import { Db, ObjectId } from "mongodb";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> => {
  try {
    const db: Db = await dbconnection();
    const books = db.collection("books");
    const id = params.id;
    const book = await books.findOne({ _id: new ObjectId(id) });
    if (!book) {
      return Response.json({ message: "Book not found" }, { status: 404 });
    }
    return Response.json(book, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ error: error.message });
    }
    return Response.json({ error: "An unknown error occurred" });
  }
};
