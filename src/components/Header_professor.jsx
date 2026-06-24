import { useNavigate } from "react-router-dom";
import { logout } from "../services/api";
import logo from "../img/logo.svg";
import bg from "../img/folhagem.png";
import "./Header.css";
import home from "../img/casa.png";
import user from "../img/do-utilizador.png";


function Header() {
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <>
      <header className="header">
        {/* imagem de fundo */}
        <img src={bg} alt="Fundo" className="header-bg" />


        {/* botão home */}
        <button className="header-btn header-home" onClick={() => navigate("/professor")}>
          <img src={home} alt="home" className="header-icon" />
        </button>


        {/* logo principal */}
        <img src={logo} alt="Logo" className="header-logo" />


        {/* botões direita */}
        <div className="header-direita">
          <button className="header-btn header-sair" onClick={handleLogout}>
            Sair
          </button>
          <button className="header-btn header-usuario" onClick={() => navigate("/perfil")}>
            <img src={user} alt="user" className="header-icon" />
          </button>
        </div>
      </header>


      {/* faixa tribal fora do header */}
      <div className="header-faixa-wrapper">
        <img src="/img/grafismo.svg" alt="" className="faixa-tribal" />
      </div>
    </>
  );
}


export default Header;