import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import {
  createPost,
  updatePost,
  deletePost,
  Post,
} from "../../../../utils/api";
import { ModalSection, ModalRow } from "./components";
import { Input, TextArea, Switch, inputStyleVariants } from "./inputs";
import { Button, buttonVariants } from "../../button";

interface Props {
  post?: Post;
  modalType?: string;
  visibility: boolean;
  toggleModalVisibility: () => void;
  handleChange: ({ id, title, views }: Partial<Post>) => void;
}

const PostModal = ({
  post,
  visibility,
  toggleModalVisibility,
  handleChange,
  modalType,
}: Props) => {
  const [modified, setModified] = useState(false);
  const [titleError, setTitleError] = useState("");

  const MAX_TITLE_LENGTH = 40;
  const MIN_TITLE_LENGTH = 5;

  const handlePostAction = (actionType: String) => {
    switch (actionType) {
      case "create":
        if (post?.title !== "") {
          console.log("CREATE");
          return createPost(post?.title || "");
        }
        return setTitleError("Title field is empty");

      case "update":
        if (post?.title !== "") {
          if (modified) {
            console.log("UPDATE");
            return updatePost(post?.id || "", post?.title || "");
          }
          return setTitleError("Nothing changed");
        }
        return setTitleError("Title field is empty");

      case "delete":
        console.log("DELETE");
        return deletePost(post?.id || "");

      default:
        return setTitleError("Unknown error...");
    }
  };

  const isValueInRange = (value: number, min: number, max: number) => {
    return value <= max && value >= min;
  };

  const validateTitle = () => {
    if (!post?.title) {
      return setTitleError("Missing title!");
    } else if (
      isValueInRange(post?.title?.length, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH)
    ) {
      return setTitleError("");
    }
    return setTitleError(
      `Title needs to be between ${MIN_TITLE_LENGTH} and ${MAX_TITLE_LENGTH} characters`,
    );
  };

  const handleTitle = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    validateTitle();
    handleChange({ title: event.target.value });
    setModified(true);
  };

  const closeModal = () => {
    setTitleError("");
    toggleModalVisibility();
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    validateTitle();
  }, [post?.title]);

  const GetModalType = () => {
    switch (modalType) {
      case "textarea":
        return (
          <TextArea
            type="text"
            labelText="Title"
            defaultValue={post?.title || ""}
            controlString={titleError}
            onChange={handleTitle}
            required={true}
          />
        );

      default:
        return (
          <Input
            type="text"
            labelText="Title"
            variant={inputStyleVariants.default}
            value={post?.title || ""}
            controlString={titleError}
            onChange={handleTitle}
            required={true}
          />
        );
    }
  };

  return (
    <div
      className={`${visibility ? "absolute" : "hidden"} flex items-center justify-center h-full w-full pointer-events-none overflow-hidden`}
    >
      <form
        onSubmit={submitHandler}
        className="flex flex-col m-6 p-4 gap-4 relative w-96 text-base rounded-2xl bg-pure shadow-md pointer-events-auto overflow-hidden"
      >
        <ModalSection variant="exit" action={closeModal} />
        <ModalSection variant="column" className="pt-8">
          {GetModalType()}
        </ModalSection>
        <ModalSection variant="row">
          <ModalRow title="Id" data={post?.id ?? ""} />
          <ModalRow title="Views" data={post?.views ?? ""} />
        </ModalSection>
        <ModalSection variant="row">
          {!post?.id ? (
            <>
              <Button
                type="button"
                className="grow"
                variant={
                  titleError ? buttonVariants.disabled : buttonVariants.default
                }
                onClick={() => handlePostAction("create")}
                disabled={Boolean(titleError)}
              >
                <p>Create</p>
              </Button>
              <Button
                type="button"
                className="grow"
                variant={buttonVariants.cancel}
                onClick={closeModal}
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
                  !modified || titleError
                    ? buttonVariants.disabled
                    : buttonVariants.default
                }
                onClick={() => handlePostAction("update")}
                disabled={Boolean(titleError) && !modified}
              >
                <p>Update</p>
              </Button>
              <Button
                type="submit"
                className="grow"
                variant={buttonVariants.delete}
                onClick={() => handlePostAction("delete")}
              >
                <p>Delete</p>
              </Button>
            </>
          )}
        </ModalSection>
      </form>
    </div>
  );
};

export { PostModal };
