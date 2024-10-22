import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import "./App.css";
import { PostModal } from "./components/ui/molecules/modal";
import { Post, getPosts } from "./lib/restUtilis";
import { TableComponent } from "./components/ui/molecules/table";

function App() {
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
    toggleModalVisibility();
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  console.log(open);

  return (
    <div className="relative w-full min-h-screen flex flex-col px-12">
      {loading ? (
        <p className="self-center uppercase">Loading...</p>
      ) : posts.length > 0 ? (
        <>
          <div className="w-full text-right flex flex-row justify-end mt-24">
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
}

export default App;
