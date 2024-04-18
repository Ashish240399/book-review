import axios from "axios";

export const getBooks = async ({
  title,
  sort,
}: {
  title?: string;
  sort?: string;
}) => {
  try {
    console.log("calling getBooks Api");
    let url = "/api/getBooks";
    if (sort) {
      url += `?sort=${sort}`;
    } else if (title && !sort) {
      url += `?title=${title}`;
    } else if (title && sort) {
      url += `?title=${title}&sort=${sort}`;
    }
    console.log(url);
    const res = await axios.get(url);
    console.log(res, "line 21");
    return res;
  } catch (error: any) {
    console.log("line 24");
    return error.response;
  }
};
