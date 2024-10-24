import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  createPost,
  updatePost,
  deletePost,
  Post,
} from "../../../../utils/api";
import { ModalSection, ModalRow } from "./inputComp";
import { InputVariants } from "./inputs/inputs";
import { Button, buttonVariants } from "../../button";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostSchema } from "./scheme";

interface Props {
  post?: Post;
  variant?: string;
  visibility: boolean;
  toggleModalVisibility: () => void;
  handleChange: ({ id, title, views }: Partial<Post>) => void;
}

const PostModal = ({
  post,
  variant,
  visibility,
  toggleModalVisibility,
  handleChange,
}: Props) => {
  const methods = useForm<Post>({
    defaultValues: post,
    resolver: zodResolver(PostSchema),
  });
  const {
    watch,
    formState: { errors },
    reset,
    getValues,
  } = methods;
  const title = watch("title");

  const handleDelete = () => {
    const data = getValues();
    return deletePost(data.id);
  };

  const handleCreate = () => {
    const data = getValues();
    if (data.title === "") return;
    return createPost(data.title);
  };

  const handleUpdate = () => {
    const data = getValues();
    if (data.title === "") return;
    return updatePost(data.id, data.title);
  };

  const closeModal = () => {
    toggleModalVisibility();
  };

  useEffect(() => {
    reset(post);
  }, [post]);

  return (
    <div
      className={`${visibility ? "absolute" : "hidden"} flex items-center justify-center h-full w-full pointer-events-none overflow-hidden`}
    >
      <FormProvider {...methods}>
        <form className="flex flex-col m-6 p-4 gap-4 relative w-96 text-base rounded-2xl bg-pure shadow-md pointer-events-auto overflow-hidden">
          <ModalSection variant="exit" action={closeModal} />
          <ModalSection variant="column" className="pt-8">
            <InputVariants
              variant={variant}
              value={title}
              handleChange={(event) =>
                handleChange({ title: event.target.value })
              }
              errorMessage={errors.title?.message}
            />
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
                    errors.title?.message
                      ? buttonVariants.disabled
                      : buttonVariants.default
                  }
                  onClick={handleCreate}
                  disabled={Boolean(errors.title?.message)}
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
                    errors.title?.message
                      ? buttonVariants.disabled
                      : buttonVariants.default
                  }
                  onClick={handleUpdate}
                  disabled={Boolean(errors.title?.message)}
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

export { PostModal };
