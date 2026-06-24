import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/api";
import logo from "../img/logo.svg";
import bg from "../img/folhagem.png";
import "./Header.css";
import home from "../img/casa.png";
import user from "../img/do-utilizador.png";

function Header() {
  const navigate = useNavigate();
  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  const tipo = localStorage.getItem("tipo");
  const nome = localStorage.getItem("nome");
  const identificador = localStorage.getItem("identificador");

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  function handleHome() {
    if (tipo === "PROFESSOR" || tipo === "ADMIN") {
      navigate("/professor");
    } else {
      navigate("/aluno");
    }
  }

  function getLabelIdentificador() {
    if (tipo === "ALUNO") return "CGM";
    if (tipo === "ADMIN") return "Login";
    return "CPF";
  }

  return (
    <>
      <header className="header">
        <img src={bg} alt="Fundo" className="header-bg" />

        <button className="header-btn header-home" onClick={handleHome}>
          <img src={home} alt="home" className="header-icon" />
        </button>

        <img src={logo} alt="Logo" className="header-logo" />

        <div className="header-direita">
          <button className="header-btn header-sair" onClick={handleLogout}>
            Sair
          </button>
          <button
            className="header-btn header-usuario"
            onClick={() => setMostrarPerfil(!mostrarPerfil)}
          >
            <img src={user} alt="user" className="header-icon" />
          </button>
        </div>

        {/* Janela de perfil */}
        {mostrarPerfil && (
          <div className="perfil-popup">
            <div className="perfil-tipo">{tipo}</div>
            <div className="perfil-nome">{nome || "—"}</div>
            <div className="perfil-identificador">
              <span className="perfil-label">{getLabelIdentificador()}:</span>
              <span>{identificador || "—"}</span>
            </div>
          </div>
        )}
      </header>

      <div className="header-faixa-wrapper">
        <img src="/img/grafismo.svg" alt="" className="faixa-tribal" />
      </div>
    </>
  );
}

export default Header;