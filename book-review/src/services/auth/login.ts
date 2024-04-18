import axios from "axios";

export const login = async (email: string, password: string) => {
  try {
    const res = await axios.post("/api/login", {
      email: email,
      password: password,
    });
    return res;
  } catch (error: any) {
    return error.response;
  }
};
