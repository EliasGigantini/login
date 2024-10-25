import { Comment } from "../Comments";
import { User } from "../Users";

export interface IComments {
  user: Partial<User>;
  comment: Partial<Comment>
}

export interface Post {
    id: string;
    title: string;
    views: number;
    comments: IComments[];
  }

export const getUpdatePostBody = async (post: Post) => {
    return JSON.stringify({
        title: post.title,
    })
}

export const getPostBody = async (post: Post, posts: Post[] | undefined) => {
    if (posts === undefined ) {
        return JSON.stringify({
        id: "1",
        title: post.title,
        views: 0,
        comments: []
      })
    }
    
    const newId = parseInt(posts?.slice(-1)[0].id) + 1
    return JSON.stringify({
      id: newId.toString(),
      title: post.title,
      views: 0,
      comments: []
    })
}