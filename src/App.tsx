import "./App.css";
import AppRoutes from "./routes";
import { AuthProvider } from "./components/auth";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
