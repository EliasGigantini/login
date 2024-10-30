import { FormProvider } from "react-hook-form";
import { ModalSection, ModalRow } from "../inputs/components";
import { InputVariants } from "../inputs/inputs";
import { Button, buttonVariants } from "../../../button";
import { MessageCircle, Eye } from "lucide-react";
import { Post } from "../../../../../utils/api/Posts";
import { Comment } from "../../../../../utils/api/Comments";
import { useEffect, useState } from "react";
import { AnimationDuration } from "../../Dashboard/components";
import { User } from "../../../../../utils/api/Users";
import { Dropdown } from "../../../Dropdown";
import { ModalComments } from "./components";

interface Props {
  methods: any;
  handleClose?: () => void;
  handleUpdate?: () => void;
  handleCreate?: () => void;
  handleDelete?: () => void;
  handleComment: () => void;
  users: User[];
  errorMessage: string | undefined;
}

const PostModal = ({
  methods,
  handleClose,
  handleUpdate,
  handleCreate,
  handleDelete,
  handleComment,
  users,
  errorMessage,
}: Props) => {
  const post = methods.getValues();

  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const fetchComments = async () => {
    const post = methods.getValues().post;
    if (!post) throw new Error("Unable to find a Post");

    setComments(methods.getValues().postComments);
  };

  const handleChange = ({ id, title }: Partial<Post>) => {
    const post = methods.getValues().post;
    if (id && post) {
      const updateId = { ...post, id };
      return methods.setValue("post", updateId);
    }

    if (title && post) {
      const updateTitle = { ...post, title };
      return methods.setValue("post", updateTitle);
    }
  };

  const handleCommentChange = ({ text }: Partial<Comment>) => {
    const comment = methods.getValues().comment;
    console.log("Handle Comment Change");

    if (!comment) console.log("No Comment");
    if (!text) console.log("No Text");

    if (comment && text) {
      const updateText = { ...comment, text };
      methods.setValue("comment", updateText);
      console.log("Setting Comment Value");
    }
  };

  const getUserNameFromId = ({ id }: Partial<User>) => {
    const username: User[] = users.filter((user) => user.id === id);

    if (username.length > 1)
      throw new Error("Found many users with the same Id");

    return username[0].firstName + " " + username[0].lastName;
  };

  const handleUserChange = ({ id }: Partial<User>) => {
    const comment = methods.getValues().comment;
    if (comment && id) {
      const user = getUserNameFromId({ id });
      const updatedComment = { ...comment, user };
      methods.setValue("comment", updatedComment);
    }
  };

  const toggleCommentsVisibility = () => {
    setShowComments((prevState) => !prevState);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div
      className={`${post?.visibility ? "absolute" : "hidden"} flex items-center justify-center h-full w-full pointer-events-none overflow-hidden`}
    >
      <FormProvider {...methods}>
        <form
          className={`${post?.visibility ? "translate-y-0" : "translate-y-36"} transition-all ${AnimationDuration.slow} flex flex-col gap-4 relative w-96 text-base pointer-events-auto`}
        >
          <div className="MAIN_TO_DEL flex flex-col gap-4 bg-pure rounded-2xl p-4 border-[1px] border-cream shadow-md shadow-blu/15">
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
            {!showComments && (
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
                    data={methods.getValues().post?.comments}
                  />
                </Button>
              </ModalSection>
            )}

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
                    disabled={Boolean(
                      methods.getValues().errors?.title?.message,
                    )}
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
                    disabled={Boolean(
                      methods.getValues().errors?.title?.message,
                    )}
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
          </div>

          {showComments ? (
            <div className="transition-all duration-1000 rounded-2xl bg-pure p-4 flex flex-col gap-4 border-[1px] border-cream shadow-md shadow-blu/15">
              <ModalSection variant="column">
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
                      data={methods.getValues().post?.comments}
                    />
                  </Button>
                </ModalSection>

                <ModalComments
                  comments={methods.getValues().postComments}
                  show={showComments}
                />

                <InputVariants
                  variant={"comment"}
                  value={methods.getValues().comment.text}
                  handleChange={(event) =>
                    handleCommentChange({ text: event.target.value })
                  }
                  name="text"
                  id={methods.getValues().post.id}
                  errorMessage={errorMessage}
                />
              </ModalSection>
              <ModalSection variant="row">
                <Dropdown users={users} methods={methods} />
                <Button
                  type="button"
                  className="grow"
                  variant={buttonVariants.action}
                  onClick={handleComment}
                >
                  <p>Comment</p>
                </Button>
              </ModalSection>
            </div>
          ) : (
            <></>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export { PostModal };
