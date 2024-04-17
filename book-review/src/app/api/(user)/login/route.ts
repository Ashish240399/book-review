import { dbconnection } from "@/lib/database";
import { Db } from "mongodb";
import bcrypt from "bcrypt";

export const POST = async (req: Request, res: Response): Promise<Response> => {
  try {
    const db: Db = await dbconnection();
    const userCollection = db.collection("users");
    const reqBody: User = await req.json();
    const userExists = await userCollection.findOne({ email: reqBody.email });
    if (!userExists) {
      return Response.json({ message: "User does not exist" }, { status: 404 });
    }
    const passwordMatch = bcrypt.compareSync(
      reqBody.password,
      userExists.password
    );
    if (!passwordMatch) {
      return Response.json({ message: "Invalid password" }, { status: 401 });
    }
    return Response.json({ message: "Login successful" }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    return Response.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
};
