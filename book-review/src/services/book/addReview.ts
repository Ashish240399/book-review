import axios from "axios";

export async function addReview({
  bookId,
  userId,
  review,
  token,
}: {
  bookId: string;
  userId: string;
  review: number;
  token: string;
}) {
  try {
    const response = await axios.post(
      "/api/addReview",
      {
        bookId: bookId,
        userId: userId,
        review: review,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}
