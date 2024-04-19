// Import necessary modules
import { dbconnection } from "@/lib/database";
import { Db, ObjectId } from "mongodb";
import { headers } from "next/headers";

// Define a function to get the headers
async function getHeaders() {
  // Get the headers
  const headerArr = headers();
  // Return a promise that resolves with the Authorization header after 1 second
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(headerArr.get("Authorization")?.split(" ")[1]);
    }, 1000)
  );
}

// Define the POST function
export const POST = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Connect to the database
    const db: Db = await dbconnection();
    // Get the books, users, and reviews collections
    const books = db.collection("books");
    const users = db.collection("users");
    const reviews = db.collection("reviews");
    // Get the token from the headers
    const token = await getHeaders();
    // Get the bookId, userId, and review from the request body
    const { bookId, userId, review } = await req.json();
    // Find the authenticated user
    const authenticatedUser = await users.findOne({
      _id: new ObjectId(userId),
      token: token,
    });
    // If the user is not authenticated, return a 401 error
    if (!authenticatedUser) {
      return Response.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }
    // Find the book
    const book = await books.findOne({ _id: new ObjectId(bookId) });
    // If the book is not found, return a 404 error
    if (!book) {
      return Response.json({ message: "Book not found" }, { status: 404 });
    }
    // Check if the review already exists
    const reviewExists = await reviews.findOne({
      userId: new ObjectId(userId),
      bookId: new ObjectId(bookId),
    });
    // If the review does not exist, insert a new review
    if (!reviewExists) {
      await reviews.insertOne({
        userId: new ObjectId(userId),
        bookId: new ObjectId(bookId),
        review: review,
      });
      return Response.json({ message: "Review added" }, { status: 200 });
    }
    // If the review exists, update the review
    await reviews.updateOne(
      { userId: new ObjectId(userId), bookId: new ObjectId(bookId) },
      { $set: { review: review } }
    );
    return Response.json({ message: "Review updated" }, { status: 200 });
  } catch (error: unknown) {
    // If an error occurs, return the error message
    if (error instanceof Error) {
      return Response.json({ error: error.message });
    }
    return Response.json({ error: "An unknown error occurred" });
  }
};
