import { doApi } from "./do_api";

export const getSignedUrl = async (params: { fileName: string }) => {
  const url = "/authorized/url/signed-url";
  const method = "GET";
  return await doApi<string>({
    method,
    url,
    params,
  });
};
