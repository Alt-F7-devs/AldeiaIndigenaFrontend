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
            {/* Coluna esquerda: inputs */}
            <div className="card-inputs">
              <input placeholder="Título da atividade" />
              <input placeholder="Data da criação" />
              <input placeholder="Número da atividade" />
            </div>

            {/* Coluna direita: upload + descartar */}
            <div className="card-side">
              <div className="upload-box">
                Selecionar Jogo
              </div>
              <button className="btn excluir">
                Descartar 🗑
              </button>
            </div>
          </div>
        </div>

        {/* Botão histórico alinhado à direita */}
        <div style={{ width: "500px", display: "flex", justifyContent: "flex-end", marginBottom: "15px" }}>
          <button className="btn-right">
            Histórico de atividades
          </button>
        </div>

        {/* GERENCIAMENTO DE ALUNOS */}
        <div className="card">
          <div className="card-header">
            Gerenciamento de alunos
          </div>

          <div className="card-body" style={{ flexDirection: "column" }}>
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

        {/* Botão listar alinhado à direita */}
        <div style={{ width: "500px", display: "flex", justifyContent: "flex-end", marginBottom: "15px" }}>
          <button className="btn-right">
            Listar alunos
          </button>
        </div>

      </div>
    </>
  );
}

export default GerenciaSala;