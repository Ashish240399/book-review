// Import necessary modules
import { dbconnection } from "@/lib/database";
import { Db } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the POST function for user login
export const POST = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Connect to the database
    const db: Db = await dbconnection();
    // Get the users collection
    const userCollection = db.collection("users");
    // Get the request body
    const reqBody = await req.json();
    // Check if a user with the given email exists
    const userExists = await userCollection.findOne({ email: reqBody.email });
    // If the user does not exist, return a 404 error
    if (!userExists) {
      return Response.json({ message: "User does not exist" }, { status: 404 });
    }
    // Check if the provided password matches the user's password
    const passwordMatch = bcrypt.compareSync(
      reqBody.password,
      userExists.password
    );
    // If the password does not match, return a 401 error
    if (!passwordMatch) {
      return Response.json({ message: "Invalid password" }, { status: 401 });
    }
    // Generate a JWT token for the user
    const token = jwt.sign(
      { id: userExists._id },
      process.env.JWT_SECRET as string
    );
    // Add the token to the user's document
    userExists.token = token;
    // Update the user's document in the database
    await userCollection.updateOne(
      { _id: userExists._id },
      { $set: { token: token } }
    );
    // Return a success message and the user's document
    return Response.json(
      { message: "Login successful", user: userExists },
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
