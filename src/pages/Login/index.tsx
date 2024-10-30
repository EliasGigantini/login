import { FormProvider, useForm } from "react-hook-form";
import { InputVariants } from "../../components/ui/molecules/Modal/inputs/inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../components/ui/molecules/Modal/validation";
import { ModalSection } from "../../components/ui/molecules/Modal/inputs/components";
import { Button, buttonVariants } from "../../components/ui/button";
import { useAuth } from "../../components/auth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import { AUTHORIZED_USERS } from "../../utils/auth/Users";
import { useState } from "react";

interface Props {
  user: string;
  password: string;
}

export const Login = ({}) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoginValid, setIsLoginValid] = useState(true);

  const methods = useForm<Props>({
    defaultValues: { user: "", password: "" },
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = methods;

  const user = watch("user");
  const password = watch("password");

  const handleUser = ({ user }: Partial<Props>) => {
    setValue("user", user || "");
  };
  const handlePassword = ({ password }: Partial<Props>) => {
    setValue("password", password || "");
  };

  const handleLogin = async () => {
    const isErrorFree = await trigger();
    if (!isErrorFree)
      throw new Error("Handle Login: Please check your input fields");

    AUTHORIZED_USERS.forEach((authUser) => {
      if (authUser.user === user && authUser.password === password) {
        login();
        navigate(ROUTES.posts);
        setIsLoginValid(true);
        return;
      }
    });

    setIsLoginValid(false);
  };

  const handleSignUp = () => {
    navigate(ROUTES.signUp);
  };

  return (
    <div className="flex-1 w-full h-screen p-4 text-base bg-pure pointer-events-auto overflow-hidden">
      <FormProvider {...methods}>
        <form className="flex flex-col items-center justify-center w-full h-full gap-8">
          <ModalSection variant="column" className="w-72 items-center">
            <p className="capitalize text-xs leading-none">Log in to</p>
            <p className="capitalize text-xl font-bold leading-none">
              nurale project
            </p>
          </ModalSection>

          <ModalSection
            variant="column"
            className="h-0.5 w-72 rounded-full bg-cream"
          />

          <ModalSection variant="column" className="w-72 mt-4">
            <InputVariants
              variant={"email"}
              value={user}
              handleChange={(event) => handleUser({ user: event.target.value })}
              name="user"
              errorMessage={errors.user?.message}
            />
            <InputVariants
              variant={"password"}
              value={password}
              handleChange={(event) =>
                handlePassword({ password: event.target.value })
              }
              name="password"
              errorMessage={errors.password?.message}
            />
          </ModalSection>

          <ModalSection variant="column" className="w-72 gap-4 text-center">
            <Button
              type="button"
              className=""
              variant={buttonVariants.login}
              onClick={handleLogin}
            >
              <p>Login</p>
            </Button>

            <p className="text-xs text-black">
              Don't have an account yet?{" "}
              <a
                onClick={handleSignUp}
                className="hover:cursor-pointer text-blu"
              >
                Sign Up
              </a>
            </p>
          </ModalSection>

          <ModalSection
            variant="column"
            className={`${isLoginValid ? "invisible" : "visible"}`}
          >
            <p className="text-sm text-red">Invalid username and/or password</p>
          </ModalSection>
        </form>
      </FormProvider>
    </div>
  );
};
