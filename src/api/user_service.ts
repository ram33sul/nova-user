import { UserCredentials, UserWithTokens } from "../types/user";
import { doApi } from "./do_api";

export const postLogin = async (data: UserCredentials) => {
  const url = "/unauthorized/user/login";
  const method = "POST";
  return await doApi<UserWithTokens>({
    method,
    url,
    data,
  });
};

export const postRegister = async (data: UserCredentials) => {
  const url = "/unauthorized/user/register";
  const method = "POST";
  return await doApi<UserWithTokens>({
    method,
    url,
    data,
  });
};
