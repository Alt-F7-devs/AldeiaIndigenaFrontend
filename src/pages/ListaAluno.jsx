import "./ListaAluno.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";


function ListaAluno() {
  const alunos = []; // futuramente virá do backend

  return (
    <>
      <Header />


      <div className="lista-page">


        <div className="lista-label">Lista de alunos</div>


        <div className="lista-card">
          <div className="lista-header-row">
            <div className="lista-col lista-col--nome">Nome do aluno</div>
            <div className="lista-col lista-col--id">Identificador</div>
          </div>

          <div className="lista-body">
            {alunos.length === 0 ? null : alunos.map((aluno, i) => (
              <div key={i} className="lista-row">
                <div className="lista-col lista-col--nome">{aluno.nome}</div>
                <div className="lista-col lista-col--id">{aluno.id}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}


export default ListaAluno;

