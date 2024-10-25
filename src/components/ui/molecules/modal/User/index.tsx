import { FormProvider } from "react-hook-form";
import { ModalSection } from "../inputs/components";
import { InputVariants } from "../inputs/inputs";
import { ModalRow } from "../inputs/components";
import { Button, buttonVariants } from "../../../button";
import { User } from "../../../../../utils/api/Users";

interface Props {
  methods: any;
  handleCreate?: () => void;
  handleUpdate?: () => void;
  handleDelete?: () => void;
  handleClose?: () => void;
  errorMessage: string | undefined;
}

const UserModal = ({
  methods,
  handleCreate,
  handleUpdate,
  handleDelete,
  handleClose,
  errorMessage,
}: Props) => {
  const user = methods.getValues();

  const handleChange = ({ firstName, lastName, age }: Partial<User>) => {
    const user = methods.getValues().user;
    if (firstName && user) {
      const updateText = { ...user, firstName };
      methods.setValue("user", updateText);
    }
    if (lastName && user) {
      const updateText = { ...user, lastName };
      methods.setValue("user", updateText);
    }
    if (age && user) {
      const updateText = { ...user, age };
      methods.setValue("user", updateText);
    }
  };

  return (
    <div
      className={`${user?.visibility ? "absolute" : "hidden"} flex items-center justify-center h-full w-full pointer-events-none overflow-hidden`}
    >
      <FormProvider {...methods}>
        <form
          className={`${user?.visibility ? "translate-y-0" : "translate-y-36"} flex flex-col m-6 p-4 gap-4 relative w-96 text-base rounded-2xl bg-pure shadow-md pointer-events-auto overflow-hidden transition-all duration-300`}
        >
          <ModalSection variant="exit" action={handleClose} />
          <ModalSection variant="column" className="pt-8">
            <InputVariants
              variant={"input"}
              value={methods.getValues().user.firstName}
              handleChange={(event) =>
                handleChange({ firstName: event.target.value })
              }
              name="firstName"
              errorMessage={methods.formState.errors.user?.firstName?.message}
            />
            <InputVariants
              variant={"input"}
              value={methods.getValues().user.lastName}
              handleChange={(event) =>
                handleChange({ lastName: event.target.value })
              }
              name="lastName"
              errorMessage={methods.formState.errors.user?.lastName?.message}
            />
            <InputVariants
              variant={"input"}
              value={methods.getValues().user.age}
              handleChange={(event) =>
                handleChange({ age: event.target.value })
              }
              name="age"
              errorMessage={methods.formState.errors.user?.age?.message}
            />
          </ModalSection>
          <ModalSection variant="row">
            <ModalRow title="Id" data={methods.getValues().user.id ?? ""} />
          </ModalSection>

          <ModalSection variant="row">
            {!methods.getValues().user.id ? (
              <>
                <Button
                  type="button"
                  className="grow"
                  variant={
                    false ? buttonVariants.disabled : buttonVariants.default
                  }
                  onClick={handleCreate}
                  disabled={Boolean(methods.getValues().errors?.text?.message)}
                >
                  <p>Create</p>
                </Button>
                <Button
                  type="button"
                  className="grow"
                  variant={buttonVariants.cancel}
                  onClick={handleClose}
                >
                  <p>Cancel</p>
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  className="grow"
                  variant={
                    methods.getValues().errors?.text?.message
                      ? buttonVariants.disabled
                      : buttonVariants.default
                  }
                  onClick={handleUpdate}
                  disabled={Boolean(methods.getValues().errors?.text?.message)}
                >
                  <p>Update</p>
                </Button>
                <Button
                  type="button"
                  className="grow"
                  variant={buttonVariants.delete}
                  onClick={handleDelete}
                >
                  <p>Delete</p>
                </Button>
              </>
            )}
          </ModalSection>
        </form>
      </FormProvider>
    </div>
  );
};

export default UserModal;
