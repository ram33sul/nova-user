import { UrlType } from "./url";

export interface PostKycBody {
  name: string;
  dialCode: string;
  mobile: string;
  url: string;
  urlType: UrlType;
}

export interface Kyc {
  _id: string;
  name: string;
  dialCode: string;
  mobile: string;
  status: KycStatus;
  createdAt: Date;
}

export enum KycStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
