// Import necessary modules
import { dbconnection } from "@/lib/database";
import { Db } from "mongodb";

// Define the GET function
export const GET = async (req: Request, res: Response): Promise<Response> => {
  // Connect to the database
  const db: Db = await dbconnection();
  try {
    // Get the books collection
    const books = db.collection("books");
    // Get all books
    let book = await books.find().toArray();
    // If no books are found, return a 404 error
    if (!book || book.length === 0) {
      return Response.json({ message: "Book not found" }, { status: 404 });
    }
    // If books are found, return the books
    return Response.json(book, { status: 200 });
  } catch (error) {
    // If an error occurs, return the error message
    if (error instanceof Error) {
      return Response.json({ error: error.message });
    }
    // If an unknown error occurs, return a generic error message
    return Response.json({ error: "An unknown error occurred" });
  }
};
