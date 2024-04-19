import axios from "axios";

export const getBookByTitleWithSort = async ({
  title,
  sort,
}: {
  title: string;
  sort: string;
}) => {
  try {
    const response = axios.post("/api/getBooks/query", {
      title: title,
      sort: sort,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};
