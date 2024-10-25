import { Post } from "./Posts";
import { Comment } from "./Comments";
import { User } from "./Users";
import { POSTS_ENDPOINT, POST_ENDPOINT, COMMENTS_ENDPOINT, COMMENT_ENDPOINT, USERS_ENDPOINT, USER_ENDPOINT } from "../constants";
import { getPostBody, getUpdatePostBody } from "./Posts";
import { getCommentBody, getUpdateCommentBody } from "./Comments";
import { getUserBody, getUpdateUserBody  } from "./Users";

interface Props {
  post?: Post | null,
  comment?: Comment | null,
  user?: User | null,
}

interface CreateProps extends Props {
  posts?: Post[] | undefined,
  comments?: Comment[] | undefined,
  users?: User[] | undefined,
}

export const getData = async (uri: string) => {
  const response = await fetch(uri, {
    method: "GET",
  });

  return await response.json();
}

export const postData = async ({ post, comment, user, posts, comments, users }: CreateProps) => {
  if (!post && !comment && !user) throw console.error("ERROR POST DATA");

  const data = await getPostDataBody({post, comment, user, posts, comments, users});
  if (!data) throw new Error("Failed to get uri and body");

  const response = await fetch(data.uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data.body,
  });

  if (!response.ok) throw new Error("PostData networking error");

  return await response.json();
}

export const updateData = async ({ post, comment, user }: Props) => {
  if (!post && !comment && !user) throw console.error("ERROR UPDATE DATA");

  const data = await getUpdateDataBody({post, comment, user});
  if (!data) throw new Error("Failed to get uri and body");

  let id: string = "";
  if (post) id = post.id;
  if (comment) id = comment.id;
  if (user) id = user.id;

  const response = await fetch(`${data.uri}${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: data.body,
  });

  if (!response.ok) throw new Error("UpdateData networking error");

  return await response.json();
}

export const deleteData = async ({ post, comment, user }: Props) => {
  if (!post && !comment && !user) throw console.error("ERROR DELETE DATA");

  const data = getDeleteUri({post, comment, user});
  if (!data) throw new Error("Failed to get uri and body");

  console.log(data);

  const response = await fetch(`${data.uri}${data.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("DeleteData networking error");

  return await response.json();
}

const getPostDataBody = async ({ post, comment, user, posts, comments, users}: CreateProps) => {
  if (post) {
    const body = await getPostBody(post || null, posts);
    return { uri: POSTS_ENDPOINT, body: body };
  }
  if (comment) {
    const body = await getCommentBody(comment, comments);
    return {uri: COMMENTS_ENDPOINT, body: body}
  }
  if (user) {
    const body = await getUserBody(user, users );
    return {uri: USERS_ENDPOINT, body: body}
  }

  return { uri: "", body: "" }
}

const getUpdateDataBody = async ({post, comment, user}: Props) => {
  if (post) {
    const body = await getUpdatePostBody(post);
    return { uri: POST_ENDPOINT, body: body };
  }
  if (comment) {
    const body = await getUpdateCommentBody(comment);
    return { uri: COMMENT_ENDPOINT, body: body };
  }
  if (user) {
    const body = await getUpdateUserBody(user);
    return { uri: USER_ENDPOINT, body: body };
  }

  return { uri: "", body: "" }
}

const getDeleteUri = ({post, comment, user}: Props) => {
  if (post) return { uri: POST_ENDPOINT, id: post.id }
  if (comment) return { uri: COMMENT_ENDPOINT, id: comment.id }
  if (user) return { uri: USER_ENDPOINT, id: user.id }

  return { uri: "", id: "" }
}
