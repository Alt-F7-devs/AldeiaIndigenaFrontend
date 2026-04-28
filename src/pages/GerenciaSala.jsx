import "./GerenciaSala.css";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

function GerenciaSala() {
  const { salaId } = useParams();

  return (
    <>
      <Header />

      <div className="gerencia-container">

        <div className="sala-label">
          Sala {salaId?.toUpperCase()}
        </div>

        {/* ANEXAR ATIVIDADE */}
        <div className="card">
          <div className="card-header">
            Anexar atividade
          </div>

          <div className="card-body">
            <input className="full" placeholder="Título da atividade" />
            <input className="full" placeholder="Data da criação" />

            <div className="row">
              <input placeholder="Número da atividade" />

              <div className="upload-box">
                Selecionar Jogo
              </div>
            </div>

            <div className="row">
              <div></div> {/* espaço vazio */}
              <button className="btn excluir">
                Descartar
              </button>
            </div>
          </div>

          
        </div>
        <button className="btn historico">
            Histórico de atividades
          </button>

        {/* GERENCIAMENTO DE ALUNOS */}
        <div className="card">
          <div className="card-header">
            Gerenciamento de alunos
          </div>

          <div className="card-body">
            <input className="full" placeholder="Nome do aluno" />

            <div className="row">
              <input placeholder="Identificador" />

              <button className="btn adicionar">
                Adicionar
              </button>

              <button className="btn excluir">
                Excluir
              </button>
            </div>
          </div>

        </div>
          <button className="btn listar">
            Listar alunos
          </button>
      </div>
    </>
  );
}

export default GerenciaSala;