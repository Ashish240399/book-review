import { dbconnection } from "@/lib/database";
import { Db } from "mongodb";

export const GET = async (req: Request, res: Response): Promise<Response> => {
  const db: Db = await dbconnection();
  try {
    const books = db.collection("books");
    let book = await books.find().toArray();
    if (!book || book.length === 0) {
      return Response.json({ message: "Book not found" }, { status: 404 });
    }
    return Response.json(book, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message });
    }
    return Response.json({ error: "An unknown error occurred" });
  }
};

// import { dbconnection } from "@/lib/database";
// import { Db } from "mongodb";

// export const GET = async (req: Request, res: Response): Promise<Response> => {
//   const db: Db = await dbconnection();
//   try {
//     const books = db.collection("books");
//     const url = new URL(req.url);
//     const searchParams = new URLSearchParams(url.searchParams);
//     const title = searchParams.get("title");
//     const sort = searchParams.get("sort");
//     let book;
//     if (title != null) {
//       book = await books
//         .find({ title: { $regex: title, $options: "i" } })
//         .sort(sort ? { title: sort === "desc" ? -1 : 1 } : {})
//         .toArray();
//     } else {
//       book = await books
//         .find()
//         .sort(sort ? { title: sort === "desc" ? -1 : 1 } : {})
//         .toArray();
//     }
//     if (!book || book.length === 0) {
//       return Response.json({ message: "Book not found" }, { status: 404 });
//     }
//     return Response.json(book, { status: 200 });
//   } catch (error) {
//     if (error instanceof Error) {
//       return Response.json({ error: error.message });
//     }
//     return Response.json({ error: "An unknown error occurred" });
//   }
// };
