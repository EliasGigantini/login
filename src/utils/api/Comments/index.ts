export interface Comment {
    id: string;
    text: string;
    postId: string;
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
      postId: comment.postId
    })
  }

  const newId = parseInt(comments?.slice(-1)[0].id) + 1
    return JSON.stringify({
      id: newId.toString(),
      text: comment.text,
      postId: comment.postId
    })
}