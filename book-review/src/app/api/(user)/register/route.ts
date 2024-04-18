import { dbconnection } from "@/lib/database";
import { Db } from "mongodb";
import bcrypt from "bcrypt";

export const POST = async (req: Request, res: Response): Promise<Response> => {
  const db: Db = await dbconnection();
  dbconnection();
  const userCollection = db.collection("users");
  try {
    const reqBody = await req.json();
    const userExists = await userCollection.findOne({ email: reqBody.email });
    if (userExists) {
      return Response.json({ message: "User already exists" }, { status: 409 });
    }
    const hashedPassword = bcrypt.hashSync(reqBody.password, 10);
    reqBody.password = hashedPassword;
    const newUser = await userCollection.insertOne(reqBody);
    return Response.json(
      { message: "User successfully registered" },
      { status: 200 }
    );
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
