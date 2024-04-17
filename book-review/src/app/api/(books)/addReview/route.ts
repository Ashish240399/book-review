import { dbconnection } from "@/lib/database";
import { Db } from "mongodb";

const POST = async (req: Request, res: Response): Promise<Response> => {
  try {
    const db: Db = await dbconnection();
    const books = db.collection("books");
    const reqBody = await req.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
    }
    return Response.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
};
