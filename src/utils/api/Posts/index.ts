import { deleteData, fixCommentsCounter, updateData } from "..";
import { POST_ENDPOINT } from "../../constants";
import { Comment } from "../Comments";

export interface Post {
    id: string;
    title: string;
    views: number;
    comments: number;
  }

export const getUpdatePostBody = async (post: Post) => {
  console.log("GetUpdatePostBody: Post");
    return JSON.stringify({
        title: post.title,
        views: post.views,
        comments: post.comments
    })
}

export const getPostBody = async (post: Post, posts: Post[] | undefined) => {
    if (posts === undefined ) {
        return JSON.stringify({
        id: "1",
        title: post.title,
        views: 0,
        comments: 0,
      })
    }
    
    const newId = parseInt(posts?.slice(-1)[0].id) + 1
    return JSON.stringify({
      id: newId.toString(),
      title: post.title,
      views: 0,
      comments: 0,
    })
}

export const incrementCommentsCounter = async (post: Post | null | undefined) => {
  if (post === null || post === undefined) throw new Error("Invalid post!");

  console.log("Incrementing post's comments counter...");

  return JSON.stringify({
    id: post.id,
    title: post.title,
    views: post.views,
    comments: post.comments + 1,
  })
}

export const updateCommentsCounter = async (post: Post | null | undefined) => {
  if (!post) throw new Error("Invalid post!");

  const bodyJson = JSON.stringify({
    id: post.id,
    title: post.title,
    views: post.views,
    comments: post.comments + 1,
  })

  const data = { uri: POST_ENDPOINT, bodyJson };
  if (!data) throw new Error("Failed to get Uri and Body!");

  const response = await fetch(`${data.uri}${post.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: data.bodyJson,
  });
  if (!response.ok) throw new Error("Update Comments Counter Networking Error...");

  return await response.json();
}

export enum UpdateCommentOperation { 
  Add = "add",
  Delete = "delete"
}

export const newUpdateComments = async (
  comment: Comment,
  post: Post,
  comments: Comment[],
  posts: Post[],
  operation: UpdateCommentOperation
) => {
  switch (operation) {
    case UpdateCommentOperation.Delete:
      const postToDeleteComment = posts.find(_post => _post.id === comment.postId);
      if (!postToDeleteComment) {
        console.log("Delete: ", postToDeleteComment);
        throw new Error("Post not found!");
      }
      
      return await handleDeleteComment(comment, postToDeleteComment, comments);
      
    case UpdateCommentOperation.Add:
      const postToAddComment = posts.find(_post => _post.id === comment.postId);
      if (!postToAddComment) {
        console.log("Delete: ", postToAddComment);
        throw new Error("Post not found!");
      }

      const updatedPost: Post = { ...post, comments: post.comments };
      return await updateData({ post: updatedPost });

    default:
      throw new Error("Invalid operation type");
  }
}

const handleDeleteComment = async (
  comment: Comment,
  post: Post,
  comments: Comment[]
) => {
  const commentToDelete = comments.find(_comment => _comment.id === comment.id);
  if (!commentToDelete) throw new Error("Comment not found");

  const updatedPost: Post = { ...post, comments: post.comments - 1 };

  await Promise.all([
    updateData({ post: updatedPost }),
    deleteData({ comment: comment })
  ]);
}