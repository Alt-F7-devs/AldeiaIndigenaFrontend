import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "../img/logo.svg";
import bg from "../img/folhagem.png";
import "./Header.css";
import home from "../img/casa.png";
import user from "../img/do-utilizador.png";

function Header({
  textoBotao = "Sair",
  rotaBotao = "/login"
}) {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState(false);
  const lastScrollY = useRef(0);

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

        <button className="header-btn header-home" onClick={() => navigate("/professor")}>
          <img src={home} alt="home" className="header-icon" />
        </button>

        <img
          src={logo}
          alt="Logo"
          className={`header-logo ${!isVisible ? "header-logo--hidden" : ""}`}
        />

        <div className="header-direita">
          <button className="header-btn header-sair" onClick={() => navigate(rotaBotao)}>
            {textoBotao}
          </button>
          <button className="header-btn header-usuario" onClick={() => navigate("/professor")}>
            <img src={user} alt="user" className="header-icon" />
          </button>
        </div>
      </header>

      <div className={`header-faixa-wrapper ${!isVisible ? "header-faixa-wrapper--hidden" : ""}`} />

      <div className="header-spacer" />
    </>
  );
}

export default Header;