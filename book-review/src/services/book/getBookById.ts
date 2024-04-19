import axios from "axios";

export const getBookById = async (id: string) => {
  try {
    const response = await axios.get("/api/getBooks/" + id);
    return response;
  } catch (error: any) {
    return error.response;
  }
};
