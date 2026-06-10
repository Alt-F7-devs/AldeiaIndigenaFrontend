import { Navigate } from "react-router-dom";

function RotaProtegida({ children, tipo }) {
  const tipoSalvo = localStorage.getItem("tipo");

  if (!tipoSalvo) {
    return <Navigate to="/login" />;
  }

  if (tipo && tipoSalvo !== tipo) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default RotaProtegida;