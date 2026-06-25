import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Cadastro.css";
import "./SelecaoCadastro.css";

function SelecaoCadastro() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="cad-page">
        <div className="cad-card">
          <div className="cad-card-header">
            <h1 className="cad-card-title">Cadastrar Usuários</h1>
          </div>

          <div className="cad-card-body">
            <p className="sel-subtitulo">Selecione o tipo de usuário que deseja cadastrar:</p>

            <button className="sel-btn" onClick={() => navigate("/cadastro/aluno")}>
              Aluno
            </button>
            <button className="sel-btn" onClick={() => navigate("/cadastro/professor")}>
              Professor
            </button>
            <button className="sel-btn" onClick={() => navigate("/cadastro/admin")}>
              Administrador
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SelecaoCadastro;
