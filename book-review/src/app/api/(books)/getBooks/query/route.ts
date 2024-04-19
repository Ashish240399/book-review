// Import necessary modules
import { dbconnection } from "@/lib/database";
import { Db } from "mongodb";

// Define the POST function
export const POST = async (req: Request, res: Response): Promise<Response> => {
  // Connect to the database
  const db: Db = await dbconnection();
  try {
    // Get the sort and title from the request body
    const { sort, title } = await req.json();
    // Get the books collection
    const books = db.collection("books");
    // Get all books
    let book = await books.find().toArray();
    // If no books are found, return a 404 error
    if (!book || book.length === 0) {
      return Response.json({ message: "Book not found" }, { status: 404 });
    }
    // If a title is provided, filter the books by title
    if (title) {
      book = book.filter((book) =>
        book.title.toLowerCase().includes(title.toLowerCase())
      );
    }
    // If a sort order is provided, sort the books
    if (sort) {
      book =
        sort == "asc"
          ? book.sort((a, b) => a.title.localeCompare(b.title)) // Sort in ascending order
          : sort == "desc"
          ? book.sort((a, b) => b.title.localeCompare(a.title)) // Sort in descending order
          : book; // If no valid sort order is provided, do not sort
    }
    // Return the books
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
