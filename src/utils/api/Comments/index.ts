import { COMMENT_ENDPOINT } from "../../constants";
import { isValidField } from "..";

export interface Comment {
    id: string;
    text: string;
    postId: string;
    user: string;
}

export const getUpdateCommentBody = async (comment: Comment) => {
    return JSON.stringify({
      text: comment.text,
    })
}

export const getCommentBody = async (comment: Comment, comments: Comment[] | undefined) => {
  if (comments === undefined ) {
    return JSON.stringify({
      id: "1",
      text: comment.text,
      postId: comment.postId,
      user: comment.user,
    })
  }
  
  const newId = parseInt(comments?.slice(-1)[0].id) + 1
  return JSON.stringify({
      id: newId.toString(),
      text: comment.text,
      postId: comment.postId,
      user: comment.user,
    })
}

export const deleteIncompleteComments = async (comments: Comment[]) => {
  if (comments.length === 0) throw new Error("Invalid Comments array: Array is empty!");

  comments.map(async (comment) => {
    if (!isValidField(comment.id) || !isValidField(comment.postId) || !isValidField(comment.text) || !isValidField(comment.user)) {
      
      const response = await fetch(`${COMMENT_ENDPOINT}${comment.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) throw new Error("Error deleting comment without a post...");
      console.log("Correctly removed an incomplete post!");

    }
  })
}