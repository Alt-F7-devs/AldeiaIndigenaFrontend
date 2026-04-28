import logo from "../img/logo.svg";
import bg from "../img/folhagem.png";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      
      {/* imagem de fundo */}
      <img src={bg} alt="Fundo" className="header-bg" />

      {/* logo principal */}
      <img src={logo} alt="Logo" className="header-logo" />

    </header>
  );
}

export default Header;