import React from "react";
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Login from "./Components/Login";
import Register from "./Components/Register";
import Kanban from "./Components/Kanban";
import { AuthProvider, useAuth } from "./AuthContext";

interface PrivateRouteProps {
  component: React.JSX.Element;
}

function PrivateRoute({ component }: PrivateRouteProps): React.JSX.Element {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Si el usuario no ha iniciado sesión, puedes redirigirlo a la página de inicio de sesión
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, renderiza el componente protegido
  return component;
}
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/kanban"
            element={<PrivateRoute component={<Kanban />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
