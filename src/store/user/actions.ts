import { User } from "../../types/user";
import { SET_USER } from "./types";

export const setUser = (payload: User) => {
  return {
    type: SET_USER,
    payload,
  };
};
