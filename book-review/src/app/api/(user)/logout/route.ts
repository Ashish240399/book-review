// Import necessary modules
import { dbconnection } from "@/lib/database";
import { Db } from "mongodb";
import { headers } from "next/headers";

// Define a function to get the Authorization header
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

// Define the POST function for user logout
export const POST = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Connect to the database
    const db: Db = await dbconnection();
    // Get the users collection
    const userCollection = db.collection("users");
    // Get the token from the headers
    const token = await getHeaders();
    // Find the user with the given token
    const loggedInUser = await userCollection.findOne({ token: token });
    // If the user is not found, return a 401 error
    if (!loggedInUser) {
      return Response.json({ message: "User not logged in" }, { status: 401 });
    }
    // Remove the token from the user's document
    userCollection.updateOne({ token: token }, { $set: { token: "" } });
    // Return a success message
    return Response.json({ message: "Logout successful" }, { status: 200 });
  } catch (error: unknown) {
    // If an error occurs, return the error message
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    // If an unknown error occurs, return a generic error message
    return Response.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
};
