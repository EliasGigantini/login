import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "../components/ui/molecules/Dashboard";
import { ROUTES } from "../utils/constants";
import { Posts } from "../pages/Posts";
import { Users } from "../pages/Users";
import { Comments } from "../pages/Comments";
import { Login } from "../pages/Login";
import { useAuth } from "../components/auth";

const AppRoutes = () => {
  const { isLogged } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={isLogged ? <Dashboard /> : <Navigate to={ROUTES.login} />}
        >
          <Route path={ROUTES.posts} element={<Posts />} />
          <Route path={ROUTES.comments} element={<Comments />} />
          <Route path={ROUTES.users} element={<Users />} />
        </Route>

        <Route path={ROUTES.login} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
