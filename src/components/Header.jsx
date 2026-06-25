import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "../img/logo.svg";
import bg from "../img/folhagem.png";
import "./Header.css";
import home from "../img/casa.png";
import user from "../img/do-utilizador.png";
import { logout } from "../services/api";

function Header() {
  const navigate = useNavigate();
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState(false);
  const lastScrollY = useRef(0);

  const tipo = localStorage.getItem("tipo");
  const nome = localStorage.getItem("nome");
  const identificador = localStorage.getItem("identificador");

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isVisible = !hidden || hovered;

  async function handleLogout() {
    await logout();
    navigate("/");
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
      <div
        className="header-hover-trigger"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />

      <header
        className={`header ${!isVisible ? "header--hidden" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img src={bg} alt="Fundo" className="header-bg" />

        <button className="header-btn header-home" onClick={handleHome}>
          <img src={home} alt="home" className="header-icon" />
        </button>

        <img
          src={logo}
          alt="Logo"
          className={`header-logo ${!isVisible ? "header-logo--hidden" : ""}`}
        />

        {/* ← só mostra se estiver logado */}
        {tipo && (
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
        )}

        {mostrarPerfil && tipo && (
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

      <div
        className={`header-faixa-wrapper ${!isVisible ? "header-faixa-wrapper--hidden" : ""}`}
      />

      <div className="header-spacer" />
    </>
  );
}

export default Header;