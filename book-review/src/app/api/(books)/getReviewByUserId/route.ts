// Import necessary modules
import { dbconnection } from "@/lib/database";
import { Db, ObjectId } from "mongodb";

// Define the POST function
export const POST = async (req: Request, res: Response): Promise<Response> => {
  // Connect to the database
  const db: Db = await dbconnection();
  try {
    // Get the reviews collection
    const reviews = db.collection("reviews");
    // Get the bookId and userId from the request body
    const { bookId, userId } = await req.json();
    // Find the review with the given bookId and userId
    const review = await reviews.findOne({
      bookId: new ObjectId(bookId),
      userId: new ObjectId(userId),
    });
    // If the review is not found, return a 404 error
    if (!review) {
      return Response.json({ message: "Review not found" }, { status: 404 });
    }
    // If the review is found, return the review
    return Response.json(review, { status: 200 });
  } catch (error: unknown) {
    // If an error occurs, return the error message
    if (error instanceof Error) {
      return Response.json({ error: error.message });
    }
    // If an unknown error occurs, return a generic error message
    return Response.json({ error: "An unknown error occurred" });
  }
};
