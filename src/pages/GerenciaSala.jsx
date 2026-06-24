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

  // ── Estado: Jogo ────────────────────────────────
  const [idJogo, setIdJogo] = useState("");
  const [jogoMsg, setJogoMsg] = useState(null);
  const [jogoErro, setJogoErro] = useState(null);
  const [jogoCarregando, setJogoCarregando] = useState(false);

  // ── Estado: Aluno ────────────────────────────────
  const [idAluno, setIdAluno] = useState("");
  const [alunoMsg, setAlunoMsg] = useState(null);
  const [alunoErro, setAlunoErro] = useState(null);
  const [alunoCarregando, setAlunoCarregando] = useState(false);

  // ── Handlers: Jogo ───────────────────────────────
  async function handleAdicionarJogo() {
    if (!idJogo.trim()) { setJogoErro("Informe o ID do jogo."); return; }
    setJogoCarregando(true); setJogoMsg(null); setJogoErro(null);
    try {
      const res = await adicionarJogoSala(Number(salaId), Number(idJogo));
      setJogoMsg(`Jogo "${res.nome}" vinculado com sucesso!`);
      setIdJogo("");
    } catch {
      setJogoErro("Erro ao vincular jogo. Verifique o ID e tente novamente.");
    } finally { setJogoCarregando(false); }
  }

  function handleDescartarJogo() {
    setIdJogo(""); setJogoMsg(null); setJogoErro(null);
  }

  // ── Handlers: Aluno ──────────────────────────────
  async function handleAdicionarAluno() {
    if (!idAluno.trim()) { setAlunoErro("Informe o CGM do aluno."); return; }
    setAlunoCarregando(true); setAlunoMsg(null); setAlunoErro(null);
    try {
      const res = await adicionarAlunoSala(Number(salaId), Number(idAluno));
      setAlunoMsg(`Aluno "${res.nome}" adicionado com sucesso!`);
      setIdAluno("");
    } catch {
      setAlunoErro("Erro ao adicionar aluno. Verifique o ID e tente novamente.");
    } finally { setAlunoCarregando(false); }
  }

  function handleExcluirAluno() {
    setIdAluno(""); setAlunoMsg(null); setAlunoErro(null);
  }

  // ── Navegação ────────────────────────────────────
  function handleListarAlunos() {
    navigate(`/lista-aluno/${salaId}`);
  }

  function handleHistoricoJogos() {
    navigate(`/historico?salaId=${salaId}`);
  }

  function handleCriarJogo() {
    navigate(`/criar-jogo/${salaId}`);
  }

  return (
    <>
      <Header />

      <div className="gerencia-container">

        <div className="sala-label">
          Sala {salaId?.toUpperCase()}
        </div>

        <div className="gerencia-wrapper">

          {/* CARD ANEXAR ATIVIDADE */}
          <div className="g-card">
            <div className="g-card-header">Anexar atividade</div>
            <div className="g-card-body">
              <div className="g-jogo-box">Selecionar Jogo</div>
              <input
                className="g-inp"
                placeholder="ID do jogo"
                value={idJogo}
                onChange={(e) => setIdJogo(e.target.value)}
                type="number"
                min="1"
              />
              <div className="g-btn-row">
                <button
                  className="g-btn btn-adicionar-jogo"
                  onClick={handleAdicionarJogo}
                  disabled={jogoCarregando}
                >
                  {jogoCarregando ? "Vinculando..." : "Adicionar"}
                </button>
                <button className="g-btn btn-descartar" onClick={handleDescartarJogo}>
                  Descartar 🗑
                </button>
              </div>
              {jogoMsg && <p className="msg-sucesso">{jogoMsg}</p>}
              {jogoErro && <p className="msg-erro">{jogoErro}</p>}
            </div>
          </div>

          {/* BOTÕES DE AÇÃO - JOGOS */}
          <div className="g-action-row">
            <button className="g-btn btn-acao" onClick={handleCriarJogo}>
              Criar Jogo
            </button>
            <button className="g-btn btn-acao" onClick={handleHistoricoJogos}>
              Histórico de jogos
            </button>
          </div>

          {/* CARD GERENCIAMENTO DE ALUNOS */}
          <div className="g-card">
            <div className="g-card-header">Gerenciamento de alunos</div>
            <div className="g-card-body">
              <input
                className="g-inp"
                placeholder="CGM"
                value={idAluno}
                onChange={(e) => setIdAluno(e.target.value)}
                type="number"
                min="1"
              />
              <div className="g-btn-row">
                <button
                  className="g-btn btn-adicionar-jogo"
                  onClick={handleAdicionarAluno}
                  disabled={alunoCarregando}
                >
                  {alunoCarregando ? "Adicionando..." : "Adicionar"}
                </button>
                <button className="g-btn btn-descartar" onClick={handleExcluirAluno}>
                  Excluir 🗑
                </button>
              </div>
              {alunoMsg && <p className="msg-sucesso">{alunoMsg}</p>}
              {alunoErro && <p className="msg-erro">{alunoErro}</p>}
            </div>
          </div>

          {/* BOTÃO LISTAR ALUNOS */}
          <div className="g-action-row">
            <button className="g-btn btn-acao" onClick={handleListarAlunos}>
              Listar alunos
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default GerenciaSala;