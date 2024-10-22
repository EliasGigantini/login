export interface Post {
    id: string;
    title: string;
    views: number;
}

export const getPosts = async () => {
    const response = await fetch("http://localhost:3000/posts", {
        method: "GET",
    });
    console.log("GET POSTS!");
    return await response.json();
};

const incrementPostId = async (): Promise<string> => {
    const posts = await getPosts();
    const lastPostId = posts?.slice(-1)[0].id;
    const id = parseInt(lastPostId) + 1;

    return id.toString();
}

export const createPost = async (title: string): Promise<void> => {
    await fetch(`http://localhost:3000/posts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: await incrementPostId(),
          title: title,
          views: 0,
        }),
      }).then(() => {
        window.location.reload();
      });
}

export const updatePost = async (id: string, title: string): Promise<void> => {
    await fetch(`http://localhost:3000/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    }).then(() => {
      window.location.reload();
    });
  };

export const deletePost = async (id: string): Promise<void> => {
    await fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      window.location.reload();
    });
  };