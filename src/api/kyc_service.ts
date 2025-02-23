import { Kyc, PostKycBody } from "../types/kyc";
import { doApi } from "./do_api";

export const postKyc = async (data: PostKycBody) => {
  const url = "/authorized/kyc";
  const method = "POST";
  return await doApi<{ createdKycId: string }>({
    method,
    url,
    data,
  });
};

export const getKycUser = async () => {
  const url = "/authorized/kyc/user";
  const method = "GET";
  return await doApi<Kyc>({
    method,
    url,
  });
};
