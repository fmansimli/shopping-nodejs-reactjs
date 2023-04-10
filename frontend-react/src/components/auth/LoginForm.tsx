import { FC, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useSchema } from "@validify-js/react";

import { LoginSchema } from "../../validations/auth.schema";

import { MyButton, MyInput } from "../ui";

type LoginData = {
  email: string;
  password: string;
};

interface IProps {
  formTitle: string;
  processing: boolean;
  onSubmit: (data: LoginData) => void;
}

const LoginForm: FC<IProps> = props => {
  const form = useSchema(LoginSchema);

  const { email, password } = form.data;

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const { ok, data, errors } = form.validate();

    if (ok) {
      props.onSubmit(data);
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-[50%] lg:py-0">
      <div className="w-full rounded-lg border-2 border-gray-800 bg-white shadow-md sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
            {props.formTitle}
          </h1>
          <form
            onSubmit={submitHandler}
            onReset={form.resetForm}
            className="space-y-4 md:space-y-6"
          >
            <div>
              <MyInput
                label="Your Email"
                placeholder="example@test.com"
                name="email"
                onChange={form.updateField}
                onBlur={form.blurField}
                value={email.value}
                autoComplete="off"
              />
              {email.touched && <div className="my-5 text-xs text-red-600">{email.error}</div>}
            </div>
            <div>
              <MyInput
                label="Password"
                placeholder="••••••••"
                name="password"
                type="password"
                onChange={form.updateField}
                onBlur={form.blurField}
                value={password.value}
                autoComplete="off"
              />
              {password.touched && (
                <div className="my-5 text-xs text-red-600">{password.error}</div>
              )}
            </div>
            <MyButton type="submit">{props.processing ? "processing..." : "Sign in"}</MyButton>

            <p className="text-sm font-light text-gray-500">
              Don’t have an account yet? &nbsp;&nbsp;
              <Link to="/auth/register" className="text-primary-600 font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
