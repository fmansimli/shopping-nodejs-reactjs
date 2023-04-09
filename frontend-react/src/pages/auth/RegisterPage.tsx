import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { http } from "../../http/http";

import RegisterForm from "../../components/auth/RegisterForm";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (data: any) => {
    const { email, password } = data;
    try {
      setLoading(true);
      await http.post("/api/auth/register", { email, password });
      toast("ok, login and enjoy!", { type: "success" });
      navigate("/auth/login", { replace: true });
    } catch (error: any) {
      toast(error.message, { type: "error" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-1/2">
        <RegisterForm formTitle="Sign Up" onSubmit={submitHandler} processing={loading} />
      </div>
    </div>
  );
};

export default RegisterPage;
