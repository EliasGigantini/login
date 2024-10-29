export const ROUTES = {
    posts: "/",
    comments: "/comments",
    users: "/users",
    login: "/login",
    signUp: "/signup"
};

export const DASHBOARD = [
    { name: "Posts", href: ROUTES.posts },
    { name: "Comments", href: ROUTES.comments },
    { name: "Users", href: ROUTES.users },
]

export const POST_ENDPOINT = "http://localhost:3000/posts/";
export const POSTS_ENDPOINT = "http://localhost:3000/posts";
export const COMMENT_ENDPOINT = "http://localhost:3000/comments/";
export const COMMENTS_ENDPOINT = "http://localhost:3000/comments";
export const USER_ENDPOINT = "http://localhost:3000/users/";
export const USERS_ENDPOINT = "http://localhost:3000/users";