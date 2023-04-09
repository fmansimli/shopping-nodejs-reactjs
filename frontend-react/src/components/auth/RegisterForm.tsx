import { FC, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useSchema } from "@validify-js/react";

import { MyButton, MyInput } from "../ui";
import { registerSchema } from "../../validations/auth.schema";

type RegisterData = {
  email: string;
  password: string;
};

interface IProps {
  formTitle: string;
  processing: boolean;
  onSubmit: (data: RegisterData) => void;
}

const RegisterForm: FC<IProps> = props => {
  const form = useSchema(registerSchema);

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
            className="space-y-4 md:space-y-6"
            onSubmit={submitHandler}
            onReset={form.resetForm}
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
            <MyButton type="submit" onClick={submitHandler}>
              Sign up
            </MyButton>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
