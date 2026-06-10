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

        <div className="cards-wrapper">

          {/* ANEXAR ATIVIDADE */}
          <div className="card">
            <div className="card-header">Anexar atividade</div>
            <div className="card-body">
              <div className="two-col">
                <div className="left-col">
                  <input className="inp" placeholder="Título da atividade" />
                  <input className="inp" placeholder="Data da criação" />
                  <input className="inp" placeholder="Numero da atividade" />
                </div>
                <div className="right-col">
                  <div className="upload-box">Selecionar Jogo</div>
                  <button className="btn btn-descartar">Descartar 🗑</button>
                </div>
              </div>
            </div>
          </div>

          <div className="btn-row">
            <button className="btn btn-historico">Histórico de atividades</button>
          </div>

          {/* GERENCIAMENTO DE ALUNOS */}
          <div className="card">
            <div className="card-header">Gerenciamento de alunos</div>
            <div className="card-body">
              <input className="inp inp-full" placeholder="Nome do aluno" />
              <div className="aluno-row">
                <input className="inp" placeholder="identificador" />
                <button className="btn btn-adicionar">Adicionar</button>
                <button className="btn btn-excluir">Excluir</button>
              </div>
            </div>
          </div>

          <div className="btn-row">
            <button className="btn btn-listar">Listar alunos</button>
          </div>

        </div>
      </div>
    </>
  );
}

export default GerenciaSala;