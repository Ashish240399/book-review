import { dbconnection } from "@/lib/database";
import { Db, ObjectId } from "mongodb";
import { headers } from "next/headers";
async function getHeaders() {
  const headerArr = headers();
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(headerArr.get("Authorization")?.split(" ")[1]);
    }, 1000)
  );
}
export const POST = async (req: Request, res: Response): Promise<Response> => {
  try {
    const db: Db = await dbconnection();
    const books = db.collection("books");
    const users = db.collection("users");
    const reviews = db.collection("reviews");
    const token = await getHeaders();
    const { bookId, userId, review } = await req.json();
    const authenticatedUser = await users.findOne({
      _id: new ObjectId(userId),
      token: token,
    });
    if (!authenticatedUser) {
      return Response.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }
    const book = await books.findOne({ _id: new ObjectId(bookId) });
    if (!book) {
      return Response.json({ message: "Book not found" }, { status: 404 });
    }
    const reviewExists = await reviews.findOne({
      userId: new ObjectId(userId),
      bookId: new ObjectId(bookId),
    });
    if (!reviewExists) {
      await reviews.insertOne({
        userId: new ObjectId(userId),
        bookId: new ObjectId(bookId),
        review: review,
      });
      return Response.json({ message: "Review added" }, { status: 200 });
    }
    await reviews.updateOne(
      { userId: new ObjectId(userId), bookId: new ObjectId(bookId) },
      { $set: { review: review } }
    );
    return Response.json({ message: "Review updated" }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ error: error.message });
    }
    return Response.json({ error: "An unknown error occurred" });
  }
};
