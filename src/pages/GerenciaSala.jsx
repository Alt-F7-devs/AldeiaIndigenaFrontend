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
  const [tituloJogo, setTituloJogo] = useState("");
  const [dataJogo, setDataJogo] = useState("");
  const [numeroJogo, setNumeroJogo] = useState("");
  const [jogoMsg, setJogoMsg] = useState(null);
  const [jogoErro, setJogoErro] = useState(null);
  const [jogoCarregando, setJogoCarregando] = useState(false);

  // ── Estado: Aluno ─────────────────────────────────────────
  const [nomeAluno, setNomeAluno] = useState("");
  const [idAluno, setIdAluno] = useState("");
  const [alunoMsg, setAlunoMsg] = useState(null);
  const [alunoErro, setAlunoErro] = useState(null);
  const [alunoCarregando, setAlunoCarregando] = useState(false);

  // ── Handlers: Jogo ───────────────────────────────────
  async function handleAdicionarJogo() {
    if (!numeroJogo.trim()) {
      setJogoErro("Informe o número da Jogo.");
      return;
    }
    setJogoCarregando(true);
    setJogoMsg(null);
    setJogoErro(null);
    try {
      const res = await adicionarJogoSala(Number(salaId), Number(numeroJogo));
      setJogoMsg(`Jogo "${res.nome}" vinculado com sucesso!`);
      setTituloJogo("");
      setDataJogo("");
      setNumeroJogo("");
    } catch {
      setJogoErro("Erro ao vincular jogo. Verifique o número e tente novamente.");
    } finally {
      setJogoCarregando(false);
    }
  }

  function handleDescartarJogo() {
    setTituloJogo("");
    setDataJogo("");
    setNumeroJogo("");
    setJogoMsg(null);
    setJogoErro(null);
  }

  // ── Handlers: Aluno ───────────────────────────────────────
  async function handleAdicionarAluno() {
    if (!idAluno.trim()) {
      setAlunoErro("Informe o CGM do aluno.");
      return;
    }
    setAlunoCarregando(true);
    setAlunoMsg(null);
    setAlunoErro(null);
    try {
      const res = await adicionarAlunoSala(Number(salaId), Number(idAluno));
      setAlunoMsg(`Aluno "${res.nome}" adicionado com sucesso!`);
      setNomeAluno("");
      setIdAluno("");
    } catch {
      setAlunoErro("Erro ao adicionar aluno. Verifique o ID e tente novamente.");
    } finally {
      setAlunoCarregando(false);
    }
  }

  function handleExcluirAluno() {
    setNomeAluno("");
    setIdAluno("");
    setAlunoMsg(null);
    setAlunoErro(null);
  }

  function handleListarAlunos() {
    navigate(`/lista-aluno/${salaId}`);
  }
  function handleHistoricoJogos() {
    navigate("/historico");
  }

  return (
    <>
      <Header />
    
      <div className="gerencia-container">
 
        <div className="sala-label">
          Sala {salaId?.toUpperCase()}
        </div>

        <div className="cards-wrapper">

          {/* ANEXAR JOGO */}
          <div className="card">
            <div className="card-header">Anexar Jogo</div>
            <div className="card-body">
              <div className="two-col">
                <div className="left-col">
                  <input 
                    className="inp" 
                    placeholder="Título da Jogo"
                    value={tituloJogo}
                    onChange={(e) => setTituloJogo(e.target.value)}
                  />
                  <input 
                    className="inp" 
                    placeholder="Data da criação"
                    type="date"
                    value={dataJogo}
                    onChange={(e) => setDataJogo(e.target.value)}
                  />
                  <input 
                    className="inp" 
                    placeholder="Numero do Jogo"
                    type="number"
                    min="1"
                    value={numeroJogo}
                    onChange={(e) => setNumeroJogo(e.target.value)}
                  />
                </div>
                <div className="right-col">
                  <button 
                    className="upload-box"
                    onClick={handleAdicionarJogo}
                    disabled={jogoCarregando}
                    style={{ cursor: jogoCarregando ? 'not-allowed' : 'pointer' }}
                  >
                    {jogoCarregando ? "Vinculando..." : "Selecionar Jogo"}
                  </button>
                  <button 
                    className="btn btn-descartar"
                    onClick={handleDescartarJogo}
                  >
                    Descartar 🗑
                  </button>
                </div>
              </div>
              {jogoMsg && (
                <p style={{ color: "#3b6e1f", marginTop: "8px", fontSize: "13px" }}>{jogoMsg}</p>
              )}
              {jogoErro && (
                <p style={{ color: "#8b0000", marginTop: "8px", fontSize: "13px" }}>{jogoErro}</p>
              )}
            </div>
          </div>

          <div className="btn-row">
            <button className="btn btn-historico" onClick={handleHistoricoJogos}>
              Histórico de jogos
            </button>
          </div>

          {/* GERENCIAMENTO DE ALUNOS */}
          <div className="card">
            <div className="card-header">Gerenciamento de alunos</div>
            <div className="card-body">
              <div className="aluno-row">
                <input 
                  className="inp" 
                  placeholder="CGM"
                  type="number"
                  min="1"
                  value={idAluno}
                  onChange={(e) => setIdAluno(e.target.value)}
                />
                <button 
                  className="btn btn-adicionar"
                  onClick={handleAdicionarAluno}
                  disabled={alunoCarregando}
                >
                  {alunoCarregando ? "Adicionando..." : "Adicionar"}
                </button>
                <button 
                  className="btn btn-excluir"
                  onClick={handleExcluirAluno}
                >
                  Excluir
                </button>
              </div>
              {alunoMsg && (
                <p style={{ color: "#3b6e1f", marginTop: "8px", fontSize: "13px" }}>{alunoMsg}</p>
              )}
              {alunoErro && (
                <p style={{ color: "#8b0000", marginTop: "8px", fontSize: "13px" }}>{alunoErro}</p>
              )}
            </div>
          </div>

          <div className="btn-row">
            <button className="btn btn-listar" onClick={handleListarAlunos}>
              Listar alunos
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default GerenciaSala;