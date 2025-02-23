import { useEffect, useMemo, useState } from "react";
import Input from "../../components/input/input.component";
import { Utils, dialCodeOptions, idTypeOptions } from "./home.util";
import { InputErrors } from "../../types/general";
import Button from "../../components/button/button.component";
import Select from "../../components/select/select.component";
import FileInput from "../../components/file_input/file_input.component";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import useApi from "../../custom_hooks/useApi";
import { getKycUser } from "../../api/kyc_service";
import Loader from "../../components/loader/loader.component";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../Routes";

export default function Home() {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [kyc, kycLoading] = useApi(getKycUser);

  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.user);

  const [errors, setErrors] = useState<InputErrors>({});

  const utils = useMemo(
    () => new Utils(setErrors, setSubmitLoading, navigate),
    []
  );

  useEffect(() => {
    if (kyc) {
      navigate(routePaths.SUBMISSION);
    }
  }, [kyc]);

  return kycLoading || kyc ? (
    <Loader />
  ) : (
    <form
      onSubmit={utils.handleSubmit}
      className="flex flex-col gap-4 mt-4 p-4"
    >
      <div className="text-lg">KYC Verification</div>
      <div className="flex gap-4 flex-wrap">
        <Input
          name="name"
          label="Name"
          error={errors.name}
          onChange={utils.onInputChange}
          className="flex-1 min-w-[200px]"
        />
        <div className="flex flex-1 min-w-[200px]">
          <Select
            options={dialCodeOptions}
            name="dialCode"
            className="rounded-tr-none rounded-br-none border-r-0"
          />
          <Input
            name="mobile"
            label="Mobile"
            type="number"
            error={errors.mobile}
            onChange={utils.onInputChange}
            className="flex-1"
            inputClassNames="rounded-tl-none rounded-bl-none"
            min={0}
          />
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Input
          name="email"
          label="Email"
          error={errors.email}
          onChange={utils.onInputChange}
          className="flex-1 min-w-[200px] opacity-50"
          value={user?.email}
          readOnly
          disabled
        />
        <Select
          options={idTypeOptions}
          name="urlType"
          className="flex-1 min-w-[200px]"
        />
      </div>
      <FileInput accept="image/*,application/pdf" name="file" />
      <Button loading={submitLoading} className="p-2 px-6 ml-auto">
        Submit
      </Button>
    </form>
  );
}
