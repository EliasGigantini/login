import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Dashboard } from "./components/ui/molecules/dashboard";
import { Prova } from "./routes/prova";
import { Table } from "./routes/table";

import { ROUTES } from "./utils/constants";

const Home = () => {
  return <h3>HOME</h3>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.prova} element={<Prova />} />
          <Route path={ROUTES.table} element={<Table />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
