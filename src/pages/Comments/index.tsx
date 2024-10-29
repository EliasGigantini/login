import { useState, useEffect } from "react";
import { postData, getData, deleteData, updateData } from "../../utils/api";
import { Comment } from "../../utils/api/Comments";
import { COMMENTS_ENDPOINT } from "../../utils/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TableComponent } from "../../components/ui/molecules/Table";
import CommentModal from "../../components/ui/molecules/Modal/Comment";
import { CommentSchema } from "../../components/ui/molecules/Modal/validation";

interface Props {
  comment?: Comment | null;
  visibility: boolean;
}

export const Comments = () => {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const methods = useForm<Props>({
    defaultValues: { comment: null, visibility: false },
    resolver: zodResolver(CommentSchema),
    mode: "onChange",
  });
  const {
    watch,
    formState: { errors },
    getValues,
    clearErrors,
    trigger,
    setValue,
  } = methods;

  const comment = watch("comment");
  const visibility = watch("visibility");

  const handleGetComments = async () => {
    const unfilteredComments = await getData(COMMENTS_ENDPOINT);
    const filteredComments = unfilteredComments.filter(
      (comment: Comment) => comment.postId,
    );
    setComments(filteredComments);
    setLoading(false);
  };

  const toggleModalVisibility = () => {
    clearErrors();
    setValue("visibility", !visibility);
  };

  const openNewModal = () => {
    handleOpenModal({ id: "", text: "", postId: "", user: "" });
  };

  const handleOpenModal = (comment: Comment) => {
    setValue("comment", comment);
    toggleModalVisibility();
  };

  const handleDelete = async () => {
    const data = getValues();
    if (data.comment?.id) {
      const result = await deleteData({ comment });

      if (result.id) {
        toggleModalVisibility();
        handleGetComments();
      }
    }
  };

  const handleCreate = async () => {
    const data = getValues();
    const isErrorFree = await trigger();
    if (isErrorFree && data.comment?.text) {
      const result = await postData({ comment, comments });

      if (result.id) {
        toggleModalVisibility();
        handleGetComments();
      }
    }

    console.log(errors);
  };

  const handleUpdate = async () => {
    console.log("Handle Update");
    const data = getValues();
    const isErrorFree = await trigger();

    if (isErrorFree && data.comment?.text && data.comment.id) {
      const result = await updateData({ comment });

      if (result.id) handleGetComments();
    }

    console.log("SOME UNEXPECTED ERROR");
  };

  useEffect(() => {
    handleGetComments();
  }, []);

  return (
    <div className="relative grow flex flex-col mx-4 overflow-y-scroll">
      {loading ? (
        <p className="self-center uppercase">Loading...</p>
      ) : (
        <>
          <div className="text-right flex flex-row justify-between mt-24">
            <h1 className="capitalize font-medium">Comments</h1>
            <button
              onClick={openNewModal}
              className="flex h-10 pointer-events-none flex-row items-center gap-1 rounded-full px-4 opacity-0"
            >
              <p>Create Comment</p>
            </button>
          </div>
          <TableComponent
            data={comments as any}
            handleOpenModal={handleOpenModal}
          />
          {comment && (
            <CommentModal
              methods={methods}
              handleClose={toggleModalVisibility}
              handleCreate={handleCreate}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              errorMessage={errors.comment?.text?.message}
            />
          )}
        </>
      )}
    </div>
  );
};
