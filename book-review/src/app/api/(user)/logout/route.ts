import { dbconnection } from "@/lib/database";
import { Db } from "mongodb";
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
    const userCollection = db.collection("users");
    const token = await getHeaders();
    const loggedInUser = await userCollection.findOne({ token: token });
    if (!loggedInUser) {
      return Response.json({ message: "User not logged in" }, { status: 401 });
    }
    userCollection.updateOne({ token: token }, { $set: { token: "" } });
    return Response.json({ message: "Logout successful" }, { status: 200 });
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
