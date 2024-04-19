import axios from "axios";

export const logout = async (token: string) => {
  try {
    const res = await axios.post(
      "/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
