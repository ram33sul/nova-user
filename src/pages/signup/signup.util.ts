import { Dispatch, SetStateAction } from "react";
import { InputErrors } from "../../types/general";
import { getFormDataVal } from "../../utils/formdata";
import { postRegister } from "../../api/user_service";
import toast from "react-hot-toast";
import { UnknownAction } from "redux";
import { setUser } from "../../store/user/actions";
import { validateUserCredentials } from "../../utils/validators";
import { resetErrors } from "../../utils/reseterrors";

export class Utils {
  constructor(
    public setErrors: Dispatch<SetStateAction<InputErrors>>,
    public dispatch: Dispatch<UnknownAction>,
    public setSubmitLoading: Dispatch<SetStateAction<boolean>>
  ) {}

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      this.setSubmitLoading(true);
      e.preventDefault();
      this.setErrors({});
      const formData = new FormData(e.currentTarget);
      const email = getFormDataVal(formData, "email");
      const password = getFormDataVal(formData, "password");
      const confirmPassword = getFormDataVal(formData, "confirmPassword");
      const { hasErrors, errors } = validateUserCredentials({
        email,
        password,
        confirmPassword,
      });
      if (hasErrors) {
        this.setErrors(errors);
        return;
      }
      const [userData, error] = await postRegister({
        email,
        password,
      });
      if (error || !userData) {
        toast.error(error);
        return;
      }
      this.dispatch(setUser(userData.user));
      toast.success("Registration Successful");
    } finally {
      this.setSubmitLoading(false);
    }
  };
  onInputChange = resetErrors(this.setErrors);
}
