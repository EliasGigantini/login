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

  const handleRegister = async () => {};

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-96 h-96 p-4 text-base rounded-2xl bg-cream shadow-md shadow-blu/15 pointer-events-auto overflow-hidden">
        <FormProvider {...methods}>
          <form className="flex flex-col w-full h-full gap-4 justify-between">
            <ModalSection variant="column" className="w-full">
              <InputVariants
                variant={"input"}
                value={user}
                handleChange={(event) =>
                  handleUser({ user: event.target.value })
                }
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

            {!isLoginValid && (
              <ModalSection variant="column">
                <p className="text-sm text-red">
                  Invalid username and/or password
                </p>
              </ModalSection>
            )}

            <ModalSection variant="column" className="gap-2">
              <Button
                type="button"
                className="flex-1"
                variant={buttonVariants.login}
                onClick={handleLogin}
              >
                <p>Login</p>
              </Button>
              <Button
                type="button"
                className="flex-1"
                variant={buttonVariants.disabled}
                onClick={handleRegister}
              >
                <p>Register</p>
              </Button>
            </ModalSection>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
