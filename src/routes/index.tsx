import { Home } from "lucide-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "../components/ui/molecules/Dashboard";
import { Posts } from "../pages/Posts";
import { Prova } from "../pages/Prova";
import { ROUTES } from "../utils/constants";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.prova} element={<Prova />} />
          <Route path={ROUTES.posts} element={<Posts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
