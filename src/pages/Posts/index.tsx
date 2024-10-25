import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { getData, updateData, deleteData, postData } from "../../utils/api";
import { Post } from "../../utils/api/Posts";
import { POSTS_ENDPOINT } from "../../utils/constants";
import { TableComponent } from "../../components/ui/molecules/Table";
import { PostModal } from "../../components/ui/molecules/Modal/Post";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostSchema } from "../../components/ui/molecules/Modal/validation";
import { useForm } from "react-hook-form";

interface Props {
  post?: Post | null;
  title: string;
  visibility: boolean;
}

export const Posts = ({}) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const methods = useForm<Props>({
    defaultValues: { post: null, visibility: false, title: "" },
    resolver: zodResolver(PostSchema),
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

  const post = watch("post");
  const visibility = watch("visibility");

  const handleGetPosts = async () => {
    setPosts(await getData(POSTS_ENDPOINT));
    setLoading(false);
  };

  const toggleModalVisibility = () => {
    clearErrors();
    setValue("visibility", !visibility);
  };

  const openNewModal = () => {
    handleOpenModal({ id: "", title: "", views: 0 });
  };

  const handleOpenModal = (post: Post) => {
    setValue("post", post);
    toggleModalVisibility();
  };

  const handleDelete = async () => {
    const data = getValues();
    if (data.post?.id) {
      const result = await deleteData({ post });

      if (result.id) {
        toggleModalVisibility();
        handleGetPosts();
      }
    }
  };

  const handleCreate = async () => {
    const data = getValues();
    const isErrorFree = await trigger();
    if (isErrorFree && data.post?.title) {
      const result = await postData({ post, posts });

      if (result.id) {
        toggleModalVisibility();
        handleGetPosts();
      }
    }

    console.log(errors);
  };

  const handleUpdate = async () => {
    const data = getValues();
    const isErrorFree = await trigger();
    if (isErrorFree && data.post?.title && data.post?.id) {
      const result = await updateData({ post });
      console.log(result);

      if (result.id) handleGetPosts();
    }

    console.log(errors);
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  return (
    <div className="relative grow flex flex-col mx-4">
      {loading ? (
        <p className="self-center uppercase">Loading...</p>
      ) : (
        <>
          <div className="text-right flex flex-row justify-end mt-24">
            <button
              onClick={openNewModal}
              className="flex flex-row items-center gap-1 rounded-full px-4 py-2 bg-white text-black transition-color ease-in-out duration-300 hover:bg-blu hover:border-blu hover:text-white"
            >
              <p>Create Post</p>
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <TableComponent
            data={posts as any}
            handleOpenModal={handleOpenModal}
          />
          {post && (
            <PostModal
              methods={methods}
              handleClose={toggleModalVisibility}
              handleCreate={handleCreate}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              errorMessage={errors.post?.title?.message}
            />
          )}
        </>
      )}
    </div>
  );
};
