import { Dispatch, SetStateAction } from "react";
import { InputErrors } from "../../types/general";
import { getFormDataVal } from "../../utils/formdata";
import toast from "react-hot-toast";
import { resetErrors } from "../../utils/reseterrors";
import { postKyc } from "../../api/kyc_service";
import { UrlType } from "../../types/url.d";
import { getSignedUrl } from "../../api/url_service";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { routePaths } from "../../Routes";

export class Utils {
  constructor(
    public setErrors: Dispatch<SetStateAction<InputErrors>>,
    public setSubmitLoading: Dispatch<SetStateAction<boolean>>,
    public navigate: NavigateFunction
  ) {}

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      this.setSubmitLoading(true);
      e.preventDefault();
      this.setErrors({});
      const formData = new FormData(e.currentTarget);
      const name = getFormDataVal(formData, "name");
      const dialCode = getFormDataVal(formData, "dialCode");
      const mobile = getFormDataVal(formData, "mobile");
      const urlType = getFormDataVal(formData, "urlType") as UrlType;
      const file = formData.get("file") as File;
      const fileName = `name_${uuid()}_${file.name}`;
      const errors: InputErrors = {};
      const MIN_FILE_SIZE = 25 * 1024;
      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      if (name.length < 3) {
        errors.name = "Name must have atleast 3 letters";
      }
      if (!mobile) {
        errors.mobile = "Mobile is required";
      }
      if (!file?.size) {
        errors.file = "File is required";
        toast.error("Please select a file");
      }
      if (
        file.size &&
        (file.size < MIN_FILE_SIZE || file.size > MAX_FILE_SIZE)
      ) {
        errors.file = "File size should be between 25KB and 5MB";
        toast.error("File size should be between 25KB and 5MB");
      }
      const hasErrors = !!Object.keys(errors).length;
      if (hasErrors) {
        this.setErrors(errors);
        return;
      }
      const [signedUrl, signedUrlError] = await getSignedUrl({
        fileName,
      });
      if (!signedUrl || signedUrlError) {
        return toast.error(
          signedUrlError || "Error occurred while uploading file"
        );
      }
      const urlFormData = new FormData();
      urlFormData.append("file", file as File);
      const url = await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      if (!url) {
        return toast.error("Error occurred while uploading file");
      }
      const appendedUrl = `${import.meta.env.VITE_S3_BUCKER_URL}/${fileName}`;
      const [kycData, error] = await postKyc({
        name,
        dialCode,
        mobile,
        urlType,
        url: appendedUrl,
      });
      if (error || !kycData) {
        toast.error(error);
        return;
      }
      toast.success("KYC successfully registered");
      this.navigate(routePaths.SUBMISSION);
    } finally {
      this.setSubmitLoading(false);
    }
  };

  onInputChange = resetErrors(this.setErrors);
}

export const dialCodeOptions = ["+971", "+91", "+1", "+61", "+966", "+44"].map(
  (dialCode) => ({ label: dialCode, value: dialCode })
);

export const idTypeOptions = Object.keys(UrlType).map((urlType) => ({
  label: urlType,
  value: urlType,
}));
