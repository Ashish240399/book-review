import axios from "axios";

export const getBooks = async ({
  title,
  sort,
}: {
  title?: string;
  sort?: string;
}) => {
  try {
    let url = "/api/getBooks";
    if (sort) {
      url += `?sort=${sort}`;
    } else if (title && !sort) {
      url += `?title=${title}`;
    } else if (title && sort) {
      url += `?title=${title}&sort=${sort}`;
    }
    const res = await axios.get(url);
    return res;
  } catch (error: any) {
    return error.response;
  }
};
