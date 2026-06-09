import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./GerenciaSala.css";
import Header from "../components/Header";
import {
  adicionarJogoSala,
  adicionarAlunoSala,
} from "../services/api";

function GerenciaSala() {
  const { salaId } = useParams();
  const navigate = useNavigate();

  // ── Estado: Jogo ──────────────────────────────────────────
  const [idJogo, setIdJogo] = useState("");
  const [jogoMsg, setJogoMsg] = useState(null);
  const [jogoErro, setJogoErro] = useState(null);
  const [jogoCarregando, setJogoCarregando] = useState(false);

  // ── Estado: Aluno ─────────────────────────────────────────
  const [idAluno, setIdAluno] = useState("");
  const [alunoMsg, setAlunoMsg] = useState(null);
  const [alunoErro, setAlunoErro] = useState(null);
  const [alunoCarregando, setAlunoCarregando] = useState(false);

  // ── Handlers: Jogo ────────────────────────────────────────
  async function handleAdicionarJogo() {
    if (!idJogo.trim()) {
      setJogoErro("Informe o ID do jogo.");
      return;
    }
    setJogoCarregando(true);
    setJogoMsg(null);
    setJogoErro(null);
    try {
      const res = await adicionarJogoSala(Number(salaId), Number(idJogo));
      setJogoMsg(`Jogo "${res.jogoNome}" vinculado com sucesso!`);
      setIdJogo("");
    } catch {
      setJogoErro("Erro ao vincular jogo. Verifique o ID e tente novamente.");
    } finally {
      setJogoCarregando(false);
    }
  }

  function handleDescartarJogo() {
    setIdJogo("");
    setJogoMsg(null);
    setJogoErro(null);
  }

  // ── Handlers: Aluno ───────────────────────────────────────
  async function handleAdicionarAluno() {
    if (!idAluno.trim()) {
      setAlunoErro("Informe o ID do aluno.");
      return;
    }
    setAlunoCarregando(true);
    setAlunoMsg(null);
    setAlunoErro(null);
    try {
      const res = await adicionarAlunoSala(Number(salaId), Number(idAluno));
      setAlunoMsg(`Aluno "${res.nome}" adicionado com sucesso!`);
      setIdAluno("");
    } catch {
      setAlunoErro("Erro ao adicionar aluno. Verifique o ID e tente novamente.");
    } finally {
      setAlunoCarregando(false);
    }
  }

  function handleListarAlunos() {
    navigate(`/lista-aluno/${salaId}`);
  }

  return (
    <>
      <Header />

      <div className="gerencia-container">
        <div className="sala-label">Sala {salaId}</div>

        <div className="cards-wrapper">

          {/* VINCULAR JOGO */}
          <div className="card">
            <div className="card-header">Vincular Jogo à Sala</div>
            <div className="card-body">
              <div className="row">
                <input
                  className="full"
                  placeholder="ID do jogo"
                  value={idJogo}
                  onChange={(e) => setIdJogo(e.target.value)}
                  type="number"
                  min="1"
                />
              </div>

              {jogoMsg && (
                <p style={{ color: "#3b6e1f", marginTop: "8px" }}>{jogoMsg}</p>
              )}
              {jogoErro && (
                <p style={{ color: "#8b0000", marginTop: "8px" }}>{jogoErro}</p>
              )}

              <div className="row" style={{ marginTop: "12px", justifyContent: "flex-end" }}>
                <button className="btn excluir" onClick={handleDescartarJogo}>
                  Descartar
                </button>
                <button
                  className="btn adicionar"
                  onClick={handleAdicionarJogo}
                  disabled={jogoCarregando}
                >
                  {jogoCarregando ? "Vinculando..." : "Vincular Jogo"}
                </button>
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
              <div className="row">
                <input
                  className="full"
                  placeholder="ID do aluno"
                  value={idAluno}
                  onChange={(e) => setIdAluno(e.target.value)}
                  type="number"
                  min="1"
                />
              </div>

              {alunoMsg && (
                <p style={{ color: "#3b6e1f", marginTop: "8px" }}>{alunoMsg}</p>
              )}
              {alunoErro && (
                <p style={{ color: "#8b0000", marginTop: "8px" }}>{alunoErro}</p>
              )}

              <div className="row" style={{ marginTop: "12px", justifyContent: "flex-end" }}>
                <button
                  className="btn adicionar"
                  onClick={handleAdicionarAluno}
                  disabled={alunoCarregando}
                >
                  {alunoCarregando ? "Adicionando..." : "Adicionar"}
                </button>
              </div>
            </div>
          </div>

          <div className="btn-row">
            <button className="btn listar" onClick={handleListarAlunos}>
              Listar alunos
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default GerenciaSala;