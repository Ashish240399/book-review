import axios from "axios";

export const getTotalBookReview = async ({ bookId }: { bookId: string }) => {
  try {
    const response = await axios.get(`/api/getBooks/${bookId}/bookReview`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};
