import clientPromise from "@/lib/mongodb";

export const GET = async (req: Request, res: Response): Promise<Response> => {
  try {
    const client = await clientPromise;
    const db = client.db("book-review");
    const books = await db.collection("books").find().toArray();
    return Response.json(books, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ error: error.message });
    }
    return Response.json({ error: "An unknown error occurred" });
  }
};
