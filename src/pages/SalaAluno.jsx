import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./SalaAluno.css";

function SalaAluno() {
  const navigate = useNavigate();

  const sala = {
    professor: "",
    materia: "",
    data: "",
    capaJogo: null,
    atividadeRota: "/conquistas",
  };

  function handleAcessarAtividade() {
    navigate(sala.atividadeRota);
  }

  return (
    <>
      <Header />

      <div className="sala-aluno-page">

        <div className="sala-aluno-strip" aria-hidden="true" />

        <main className="sala-aluno-content">
          <div
            className="sala-aluno-card"
            role="region"
            aria-label="Minha Sala de Aula"
          >
            <div className="sala-aluno-card__header">
              <h1 className="sala-aluno-card__title">Minha Sala de Aula</h1>
            </div>

            <div className="sala-aluno-card__body">

              <div className="sala-aluno-col--info">
                <div className="sala-aluno-field" aria-label="Professor">
                  {sala.professor ? `Professor: ${sala.professor}` : "Professor:"}
                </div>
                <div className="sala-aluno-field" aria-label="Matéria">
                  {sala.materia || "Matéria"}
                </div>
                <div className="sala-aluno-field" aria-label="Data">
                  {sala.data ? `Data: ${sala.data}` : "Data:"}
                </div>
              </div>

              <div className="sala-aluno-col--cover">
                <div className="sala-aluno-cover" aria-label="Capa do jogo">
                  {sala.capaJogo ? (
                    <img
                      src={sala.capaJogo}
                      alt="Capa do jogo"
                      className="sala-aluno-cover__img"
                    />
                  ) : (
                    <span className="sala-aluno-cover__placeholder">
                      Capa do Jogo
                    </span>
                  )}
                </div>

                <button
                  className="sala-aluno-btn--acessar"
                  onClick={handleAcessarAtividade}
                  aria-label="Acessar atividade"
                >
                  Acessar atividade
                </button>
              </div>

            </div>
          </div>
        </main>

        <div className="sala-aluno-strip sala-aluno-strip--bottom" aria-hidden="true" />
        <div className="sala-aluno-footer-bar" aria-hidden="true" />

      </div>
    </>
  );
}

export default SalaAluno;