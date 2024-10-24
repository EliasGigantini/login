export const POST_ENDPOINT = "http://localhost:3000/posts/";
export const POSTS_ENDPOINT = "http://localhost:3000/posts";
export interface Post {
    id: string;
    title: string;
    views: number;
}

export const getPosts = async () => {
    const response = await fetch(POSTS_ENDPOINT, {
        method: "GET",
    });
    return await response.json();
};

const incrementPostId = async (): Promise<string> => {
    const posts = await getPosts();
    const lastPostId = posts?.slice(-1)[0].id;
    const id = parseInt(lastPostId) + 1;

    return id.toString();
}

export const createPost = async (title: string): Promise<void> => {
    await fetch(POSTS_ENDPOINT, {
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
    await fetch(`${POST_ENDPOINT}${id}`, {
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
    await fetch(`${POST_ENDPOINT}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      window.location.reload();
    });
  };