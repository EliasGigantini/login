import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "../components/ui/molecules/Dashboard";
import { ROUTES } from "../utils/constants";
import { Posts } from "../pages/Posts";
import { Users } from "../pages/Users";
import { Comments } from "../pages/Comments";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path={ROUTES.posts} element={<Posts />} />
          <Route path={ROUTES.comments} element={<Comments />} />
          <Route path={ROUTES.users} element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
