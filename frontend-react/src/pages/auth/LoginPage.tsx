import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { http } from "../../http/http";
import { signSelector } from "../../store/auth.state";

import LoginForm from "../../components/auth/LoginForm";

import { toast } from "react-toastify";

const LoginPage = () => {
  const setAuth = useSetRecoilState(signSelector);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (data: any) => {
    const { email, password } = data;
    try {
      setLoading(true);
      const { data } = await http.post("/api/auth/login", { email, password });

      http.defaults.headers["Authorization"] = "Bearer " + data.auth.accessToken;

      localStorage.setItem("auth", JSON.stringify(data));
      setAuth({ user: data.user, auth: data.auth });

      navigate("/", { replace: true });
    } catch (error: any) {
      toast(error.message, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-1/2">
        <LoginForm
          formTitle="Sign In to your account"
          onSubmit={submitHandler}
          processing={loading}
        />
      </div>
    </div>
  );
};

export default LoginPage;
