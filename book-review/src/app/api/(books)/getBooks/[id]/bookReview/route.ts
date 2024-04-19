// Import necessary modules
import { dbconnection } from "@/lib/database";
import { Db, ObjectId } from "mongodb";

// Define the GET function
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    // Connect to the database
    const db: Db = await dbconnection();
    // Get the reviews collection
    const reviews = db.collection("reviews");
    // Get the bookId from the request parameters
    const bookId = params.id;
    // Find all reviews for the book
    const bookReviews = await reviews
      .find({ bookId: new ObjectId(bookId) })
      .toArray();
    // If there are no reviews, return a response with a review of 0
    if (bookReviews.length == 0) {
      return Response.json({ review: 0 }, { status: 200 });
    } else {
      // If there are reviews, calculate the average review
      let totalAmountOfReview = 0;
      bookReviews.forEach((element) => {
        totalAmountOfReview += element.review;
      });
      const averageReview = totalAmountOfReview / bookReviews.length;
      // Return a response with the average review
      return Response.json({ review: averageReview }, { status: 200 });
    }
  } catch (error: unknown) {
    // If an error occurs, return the error message
    if (error instanceof Error) {
      return Response.json({ error: error.message });
    }
    // If an unknown error occurs, return a generic error message
    return Response.json({ error: "An unknown error occurred" });
  }
};
