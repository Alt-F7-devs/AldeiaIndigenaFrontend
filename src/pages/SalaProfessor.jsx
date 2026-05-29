import "./SalaProfessor.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function SalaProfessor() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="sala-container">
        <div className="sala-content">

          <div className="sala-titulo">
            <h2>Minhas Salas</h2>
          </div>

          {/* SALA A */}
          <div className="sala-card">
            <div className="sala-info">
              <span className="tag-sala">Sala A</span>
              <span className="tag-alunos">34 Alunos Cadastrados</span>
              <span className="tag-materia">Matemática</span>
            </div>

            <button 
              className="sala-btn"
              onClick={() => navigate("/gerencia/a")}
            >
              Gerenciar Sala
            </button>
          </div>

          {/* SALA B */}
          <div className="sala-card">
            <div className="sala-info">
              <span className="tag-sala">Sala B</span>
              <span className="tag-alunos">20 Alunos Cadastrados</span>
              <span className="tag-materia">Português</span>
            </div>

            <button 
              className="sala-btn"
              onClick={() => navigate("/gerencia/b")}
            >
              Gerenciar Sala
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default SalaProfessor;