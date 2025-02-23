import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/loader.component";
import { useEffect } from "react";
import useApi from "../../custom_hooks/useApi";
import { getKycUser } from "../../api/kyc_service";
import dayjs from "dayjs";
import StatusChip from "../../components/status_chip/status_chip.component";
import { routePaths } from "../../Routes";

export default function Submission() {
  const [kyc, kycLoading] = useApi(getKycUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (!kyc && !kycLoading) {
      navigate(routePaths.HOME);
    }
  }, [kyc]);

  return kycLoading || !kyc ? (
    <Loader />
  ) : (
    <div className="p-4 flex flex-col justify-center">
      <div className="text-xl text-center">
        Your KYC is Submitted on{" "}
        <strong>{dayjs(kyc.createdAt).format("DD MMM YYYY")}</strong>
      </div>
      <div className="flex gap-4 text-center justify-center mt-4">
        <div>Status</div>
        <StatusChip status={kyc.status} />
      </div>
    </div>
  );
}
