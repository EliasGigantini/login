import { FormProvider } from "react-hook-form";
import { ModalSection, ModalRow } from "../inputs/components";
import { InputVariants } from "../inputs/inputs";
import { Button, buttonVariants } from "../../../button";
import { MessageCircle, Eye } from "lucide-react";
import { IComments, Post } from "../../../../../utils/api/Posts";
import { useState } from "react";
import { AnimationDuration } from "../../Dashboard/components";

interface Props {
  methods: any;
  handleClose?: () => void;
  handleUpdate?: () => void;
  handleCreate?: () => void;
  handleDelete?: () => void;
  errorMessage: string | undefined;
}

interface Props2 {
  comments: IComments[];
  show: boolean;
}

const PostModal = ({
  methods,
  handleClose,
  handleUpdate,
  handleCreate,
  handleDelete,
  errorMessage,
}: Props) => {
  const post = methods.getValues();

  const [showComments, setShowComments] = useState(false);

  const handleChange = ({ id, title }: Partial<Post>) => {
    const post = methods.getValues().post;
    if (id && post) {
      const updateId = { ...post, id };
      methods.setValue("post", updateId);
    }

    if (title && post) {
      const updateTitle = { ...post, title };
      methods.setValue("post", updateTitle);
    }
  };

  const toggleCommentsVisibility = () =>
    setShowComments((prevState) => !prevState);

  const ModalComments = ({ comments, show }: Props2) => {
    return (
      <div
        className={`${show ? "visible max-h-32 overflow-y-scroll" : "invisible h-0"}`}
      >
        {comments.map((comment, index) => (
          <div
            key={comment.comment.id}
            className="flex flex-row gap-2 items-center"
          >
            <p className="font-medium text-sm">
              {comment.user.firstName} {comment.user.lastName}:
            </p>
            <p className="text-sm">{comment.comment.text}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`${post?.visibility ? "absolute" : "hidden"} flex items-center justify-center h-full w-full pointer-events-none overflow-hidden`}
    >
      <FormProvider {...methods}>
        <form
          className={`${post?.visibility ? "translate-y-0" : "translate-y-36"} transition-all ${AnimationDuration.slow} flex flex-col m-6 p-4 gap-4 relative w-96 text-base rounded-2xl bg-pure shadow-md pointer-events-auto overflow-hidden`}
        >
          <ModalSection variant="exit" action={handleClose} />
          <ModalSection variant="column" className="pt-8">
            <InputVariants
              variant={"input"}
              value={methods.getValues().post.title}
              handleChange={(event) =>
                handleChange({ title: event.target.value })
              }
              name="title"
              id={methods.getValues().post.id}
              errorMessage={errorMessage}
            />
          </ModalSection>
          <ModalSection variant="row">
            <ModalRow
              icon={<Eye className="h-4 w-4" />}
              data={methods.getValues().post.views ?? "0"}
            />
            <Button
              type="button"
              className="flex-1"
              variant={buttonVariants.ghost}
              onClick={toggleCommentsVisibility}
            >
              <ModalRow
                icon={<MessageCircle className="h-4 w-4" />}
                data={methods.getValues().post.comments.length ?? "0"}
              />
            </Button>
          </ModalSection>

          <ModalSection variant="column">
            <ModalComments
              comments={methods.getValues().post.comments}
              show={showComments}
            />
          </ModalSection>

          <ModalSection variant="row">
            {!methods.getValues().post.id ? (
              <>
                <Button
                  type="button"
                  className="grow"
                  variant={
                    false ? buttonVariants.disabled : buttonVariants.default
                  }
                  onClick={handleCreate}
                  disabled={Boolean(methods.getValues().errors?.title?.message)}
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
                    methods.getValues().errors?.title?.message
                      ? buttonVariants.disabled
                      : buttonVariants.default
                  }
                  onClick={handleUpdate}
                  disabled={Boolean(methods.getValues().errors?.title?.message)}
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

          <ModalSection variant="column">
            <Button
              type="button"
              className="grow"
              variant={buttonVariants.action}
              onClick={handleUpdate}
            >
              <p>Comment</p>
            </Button>
          </ModalSection>
        </form>
      </FormProvider>
    </div>
  );
};

export { PostModal };
