// Import necessary modules
import { dbconnection } from "@/lib/database";
import { Db, ObjectId } from "mongodb";

// Define the GET function
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> => {
  try {
    // Connect to the database
    const db: Db = await dbconnection();
    // Get the books collection
    const books = db.collection("books");
    // Get the id from the request parameters
    const id = params.id;
    // Find the book with the given id
    const book = await books.findOne({ _id: new ObjectId(id) });
    // If the book is not found, return a 404 error
    if (!book) {
      return Response.json({ message: "Book not found" }, { status: 404 });
    }
    // If the book is found, return the book
    return Response.json(book, { status: 200 });
  } catch (error: unknown) {
    // If an error occurs, return the error message
    if (error instanceof Error) {
      return Response.json({ error: error.message });
    }
    // If an unknown error occurs, return a generic error message
    return Response.json({ error: "An unknown error occurred" });
  }
};
