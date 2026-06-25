import { Navigate } from "react-router-dom";

function RotaProtegida({ children, tipo }) {
  const tipoSalvo = localStorage.getItem("tipo");

  if (!tipoSalvo) {
    return <Navigate to="/" />;
  }

  const tiposPermitidos = Array.isArray(tipo) ? tipo : [tipo];

  if (tipo && !tiposPermitidos.includes(tipoSalvo)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RotaProtegida;