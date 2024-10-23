import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { TableComponent } from "../../components/ui/molecules/table";
import { Post, getPosts } from "../../utils/api";
import { PostModal } from "../../components/ui/molecules/modal";

export const Table = ({}) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState<Post | null>(null);
  const [open, setOpen] = useState(false);

  const handleChange = ({ id, title }: Partial<Post>) => {
    if (id && post) {
      const updatePost = { ...post, id };
      setPost(updatePost);
    }

    if (title && post) {
      const updatePost = { ...post, title };
      setPost(updatePost);
    }
  };

  const handleGetPosts = async () => {
    setPosts(await getPosts());
    setLoading(false);
  };

  const toggleModalVisibility = () => {
    setOpen((open) => !open);
  };

  const handleOpenModal = (post: Post) => {
    setPost(post);
    console.log(post.title);
    toggleModalVisibility();
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  return (
    <div className="relative grow flex flex-col mx-4">
      {loading ? (
        <p className="self-center uppercase">Loading...</p>
      ) : posts.length > 0 ? (
        <>
          <div className="text-right flex flex-row justify-end mt-24">
            <button
              onClick={() => handleOpenModal({ id: "", title: "", views: 0 })}
              className="flex flex-row items-center gap-1 rounded-full px-4 py-2 bg-white text-black transition-color ease-in-out duration-300 hover:bg-blu hover:border-blu hover:text-white"
            >
              <p>Create Post</p>
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <TableComponent
            items={posts as any}
            handleOpenModal={handleOpenModal}
          />
          {post && (
            <PostModal
              post={post}
              modalType="input"
              visibility={open}
              toggleModalVisibility={toggleModalVisibility}
              handleChange={handleChange}
            />
          )}
        </>
      ) : (
        <p className="uppercase">No posts yet.</p>
      )}
    </div>
  );
};
