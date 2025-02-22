import { ButtonStyleType } from "../../components/button/button.d";
import Button from "../../components/button/button.component";
import Input from "../../components/input/input.component";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import { InputErrors } from "../../types/general";
import { Utils } from "./login.util";

export default function Login() {
  const [errors, setErrors] = useState<InputErrors>({});

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const navigateToSignup = () => {
    navigate("/signup");
  };

  const utils = useMemo(() => new Utils(setErrors, dispatch), []);
  return (
    <div className="p-8 shadow-[0px_0px_30px_rgba(128,128,128,0.5)] max-w-[500px] m-auto mt-8 rounded-3xl">
      <div className="text-center">LOGIN</div>
      <form onSubmit={utils.handleSubmit} className="flex flex-col gap-4 mt-4">
        <Input
          name="email"
          label="Email"
          error={errors.email}
          onChange={utils.onInputChange}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          error={errors.password}
          onChange={utils.onInputChange}
        />
        <Button className="w-full p-2">Submit</Button>
        <div className="text-center">or</div>
        <Button
          onClick={navigateToSignup}
          styletype={ButtonStyleType.NORMAL}
          className="w-full p-2"
        >
          Register Account
        </Button>
      </form>
    </div>
  );
}
