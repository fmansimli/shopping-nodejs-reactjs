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
    } else {
      alert(JSON.stringify(errors, null, 2));
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-[50%] lg:py-0">
      <div
        className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700
       dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0"
      >
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1
            className="text-xl font-bold leading-tight tracking-tight
           text-gray-900 dark:text-white md:text-2xl"
          >
            {props.formTitle}
          </h1>
          <form
            onSubmit={submitHandler}
            onReset={form.resetForm}
            className="space-y-4 md:space-y-6"
          >
            <MyInput
              label="Your Email"
              placeholder="example@test.com"
              name="email"
              onChange={form.updateField}
              onBlur={form.blurField}
              value={email.value}
            />
            <MyInput
              label="Password"
              placeholder="••••••••"
              name="password"
              type="password"
              onChange={form.updateField}
              onBlur={form.blurField}
              value={password.value}
            />
            <MyButton type="submit">{props.processing ? "processing..." : "Sign in"}</MyButton>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                to="/auth/register"
                className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
              >
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
