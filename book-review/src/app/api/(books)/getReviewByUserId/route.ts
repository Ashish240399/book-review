import { dbconnection } from "@/lib/database";
import { Db, ObjectId } from "mongodb";

export const POST = async (req: Request, res: Response): Promise<Response> => {
  const db: Db = await dbconnection();
  try {
    const reviews = db.collection("reviews");
    const { bookId, userId } = await req.json();
    const review = await reviews.findOne({
      bookId: new ObjectId(bookId),
      userId: new ObjectId(userId),
    });
    if (!review) {
      return Response.json({ message: "Review not found" }, { status: 404 });
    }
    return Response.json(review, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ error: error.message });
    }
    return Response.json({ error: "An unknown error occurred" });
  }
};
