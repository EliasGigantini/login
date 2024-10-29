import { FormProvider } from "react-hook-form";
import { ModalSection } from "../inputs/components";
import { InputVariants } from "../inputs/inputs";
import { ModalRow } from "../inputs/components";
import { Button, buttonVariants } from "../../../button";
import { Comment } from "../../../../../utils/api/Comments";

interface Props {
  methods: any;
  handleCreate?: () => void;
  handleUpdate?: () => void;
  handleDelete?: () => void;
  handleClose?: () => void;
  errorMessage: string | undefined;
}

const CommentModal = ({
  methods,
  handleCreate,
  handleUpdate,
  handleDelete,
  handleClose,
  errorMessage,
}: Props) => {
  const comment = methods.getValues();

  const handleChange = ({ text }: Partial<Comment>) => {
    const comment = methods.getValues().comment;
    if (text && comment) {
      const updateText = { ...comment, text };
      methods.setValue("comment", updateText);
    }
  };

  return (
    <div
      className={`${comment?.visibility ? "fixed -ml-12" : "hidden"} flex items-center justify-center h-full w-full pointer-events-none overflow-hidden`}
    >
      <FormProvider {...methods}>
        <form
          className={`${comment?.visibility ? "translate-y-0" : "translate-y-36"} flex flex-col m-6 p-4 gap-4 relative w-96 text-base rounded-2xl bg-pure shadow-md pointer-events-auto overflow-hidden transition-all duration-300`}
        >
          <ModalSection variant="exit" action={handleClose} />
          <ModalSection variant="column" className="pt-8">
            <InputVariants
              variant={"input"}
              value={methods.getValues().comment.text}
              handleChange={(event) =>
                handleChange({ text: event.target.value })
              }
              name="text"
              id={methods.getValues().comment.id}
              errorMessage={errorMessage}
            />
          </ModalSection>
          <ModalSection variant="row">
            <ModalRow
              title="PostId"
              data={methods.getValues().comment.postId ?? ""}
            />
          </ModalSection>

          <ModalSection variant="row">
            {!methods.getValues().comment.id ? (
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

export default CommentModal;
