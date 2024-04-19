import axios from "axios";

export async function getReviewByUserId({
  userId,
  bookId,
}: {
  userId: string;
  bookId: string;
}) {
  try {
    const response = await axios.post(
      "/api/getReviewByUserId",
      {
        userId: userId,
        bookId: bookId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}
