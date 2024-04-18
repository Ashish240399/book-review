import axios from "axios";
import { User } from "../../../types";

export const register = async (user: User) => {
  try {
    const res = await axios.post("/api/register", user);
    return res;
  } catch (error: any) {
    return error.response;
  }
};
