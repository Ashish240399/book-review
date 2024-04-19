// Import necessary modules
import { dbconnection } from "@/lib/database";
import { Db } from "mongodb";
import bcrypt from "bcrypt";

// Define the POST function for user registration
export const POST = async (req: Request, res: Response): Promise<Response> => {
  // Connect to the database
  const db: Db = await dbconnection();
  // Get the users collection
  const userCollection = db.collection("users");
  try {
    // Get the request body
    const reqBody = await req.json();
    // Check if a user with the given email already exists
    const userExists = await userCollection.findOne({ email: reqBody.email });
    // If the user already exists, return a 409 error
    if (userExists) {
      return Response.json({ message: "User already exists" }, { status: 409 });
    }
    // Hash the user's password
    const hashedPassword = bcrypt.hashSync(reqBody.password, 10);
    // Replace the plain text password with the hashed password
    reqBody.password = hashedPassword;
    // Insert the new user into the database
    const newUser = await userCollection.insertOne(reqBody);
    // Return a success message
    return Response.json(
      { message: "User successfully registered" },
      { status: 200 }
    );
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
