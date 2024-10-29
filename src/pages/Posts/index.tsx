import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import {
  getData,
  updateData,
  deleteData,
  postData,
  fixCommentsCounter,
} from "../../utils/api";
import {
  newUpdateComments,
  Post,
  UpdateCommentOperation,
} from "../../utils/api/Posts";
import { Comment, deleteIncompleteComments } from "../../utils/api/Comments";
import { User } from "../../utils/api/Users";
import {
  COMMENTS_ENDPOINT,
  POSTS_ENDPOINT,
  USERS_ENDPOINT,
} from "../../utils/constants";
import { TableComponent } from "../../components/ui/molecules/Table";
import { PostModal } from "../../components/ui/molecules/Modal/Post";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostSchema } from "../../components/ui/molecules/Modal/validation";
import { useForm } from "react-hook-form";

interface Props {
  post?: Post | null;
  comment?: Comment | null;
  user: User | null;
  postComments: Comment[];
  title: string;
  visibility: boolean;
}

export const Posts = ({}) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState([]);

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
  const comment = watch("comment");
  const postComments = watch("postComments");
  const visibility = watch("visibility");

  const fetchPosts = async () => {
    const fetchedPosts = await getData(POSTS_ENDPOINT);
    setPosts(await fetchedPosts);
    setLoading(false);

    return fetchedPosts;
  };

  const fetchComments = async () => {
    const fetchedComments = await getData(COMMENTS_ENDPOINT);
    setComments(await fetchedComments);

    const pocom_filtered = fetchedComments.filter(
      (comment: any) => comment.postId === getValues().post?.id,
    );
    console.log("Post Comments: ", pocom_filtered);
    setValue("postComments", pocom_filtered);

    return fetchedComments;
  };

  const updateComments = async () => {
    await deleteIncompleteComments(comments);
    await fetchComments();
  };

  const fetchUsers = async () => {
    const fetchedUsers = await getData(USERS_ENDPOINT);
    setUsers(await fetchedUsers);

    return fetchedUsers;
  };

  const filterCommentsForPost = () => {
    setValue(
      "postComments",
      comments.filter(
        (comment: Comment) => comment.postId === getValues().post?.id,
      ),
    );

    const filteredComments = comments.filter(
      (comment: Comment) => comment.postId === getValues().post?.id,
    );

    console.log("Fitlered Comments: ", filteredComments);
  };

  const toggleModalVisibility = () => {
    clearErrors();
    setValue("visibility", !visibility);
    filterCommentsForPost();
  };

  const openNewModal = () => {
    handleOpenModal({ id: "", title: "", views: 0, comments: 0 });
    filterCommentsForPost();
  };

  const handleOpenModal = (post: Post) => {
    setValue("post", post);
    setValue("comment", { id: "", text: "", postId: post.id, user: "" });
    setValue("user", { id: "", firstName: "", lastName: "", age: null });
    toggleModalVisibility();
    filterCommentsForPost();
  };

  const handleDelete = async () => {
    const data = getValues();
    if (data.post?.id) {
      const result = await deleteData({ post });

      if (result.id) {
        toggleModalVisibility();
        fetchPosts();
      }
    }

    updateComments();
  };

  const handleCreate = async () => {
    const data = getValues();
    const isErrorFree = await trigger();
    if (isErrorFree && data.post?.title) {
      const result = await postData({ post, posts });

      if (result.id) {
        toggleModalVisibility();
        fetchPosts();
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

      if (result.id) fetchPosts();
    }

    console.log(errors);
  };

  const handleComment = async () => {
    const data = getValues();
    const isErrorFree = await trigger();

    if (!post) throw new Error("Can't find post");
    if (isErrorFree && data.comment?.text) {
      const defaultUser = users[0].firstName + " " + users[0].lastName;

      const commentToPost = {
        id: data.comment.id,
        text: data.comment.text,
        postId: data.comment.postId,
        user:
          data.user?.id !== ""
            ? `${data.user?.firstName} ${data.user?.lastName}`
            : defaultUser,
      };
      setValue("comment", commentToPost);

      const result = await postData({
        comment: commentToPost,
        comments: comments,
      });

      console.log("Result: ", result);
      await newUpdateComments(
        data.comment,
        post,
        comments,
        posts,
        UpdateCommentOperation.Add,
      );

      const refreshedData = await refreshData();
      await fixCommentsCounter(refreshedData.posts, refreshedData.comments);
      await refreshData();
      setValue("post", { ...post, comments: post.comments + 1 });
      setValue("comment", { id: "", text: "", postId: post.id, user: "" });
      filterCommentsForPost();
    }
  };

  const refreshData = async () => {
    const refreshedPosts = await fetchPosts();
    const refreshedComments = await fetchComments();
    const refreshedUsers = await fetchUsers();

    return {
      posts: refreshedPosts,
      comments: refreshedComments,
      users: refreshedUsers,
    };
  };

  useEffect(() => {
    fetchPosts();
    fetchComments();
    fetchUsers();
  }, []);

  const CHECK_ERRORS = async () => {
    await fixCommentsCounter(posts, comments);
  };

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
              handleComment={handleComment}
              users={users}
              errorMessage={errors.post?.title?.message}
            />
          )}

          <button onClick={CHECK_ERRORS} className="bg-red text-pure">
            ERROR CHECKING
          </button>
        </>
      )}
    </div>
  );
};
