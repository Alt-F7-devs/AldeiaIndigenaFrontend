import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header_aluno";
import {
  criarJogo,
  editarJogo,
  buscarJogoPorId,
  listarAlunosDaSala,
  listarPresencasJogo,
  registrarPresenca,
  deletarPresenca,
} from "../services/api";
import "./CriarEditarJogo.css";

function CriarEditarJogo() {
  const { jogoId, salaId } = useParams();
  const navigate = useNavigate();
  const isEditando = Boolean(jogoId);

  // Estado: Formulário
  const [nome, setNome] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  // Estado: Presenças
  const [alunos, setAlunos] = useState([]);
  const [presenças, setPresencas] = useState(new Set());
  const [alunosCarregando, setAlunosCarregando] = useState(false);
  const [presencasCarregando, setPresencasCarregando] = useState(false);

  // Carregar dados do jogo se estiver editando
  useEffect(() => {
    if (isEditando) {
      carregarJogo();
    }

    if (salaId) {
      carregarAlunos();
    }

    if (isEditando && salaId) {
      carregarPresencas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jogoId, salaId, isEditando]);

  async function carregarJogo() {
    try {
      setCarregando(true);
      const jogo = await buscarJogoPorId(jogoId);
      setNome(jogo.nome || "");
    } catch (err) {
      setErro("Erro ao carregar jogo");
      console.error(err);
    } finally {
      setCarregando(false);
    }
  }

  async function carregarAlunos() {
    try {
      setAlunosCarregando(true);
      const listaAlunos = await listarAlunosDaSala(salaId);
      setAlunos(Array.isArray(listaAlunos) ? listaAlunos : []);
    } catch (err) {
      console.error("Erro ao carregar alunos:", err);
      setAlunos([]);
    } finally {
      setAlunosCarregando(false);
    }
  }

  // Carrega do backend quais alunos já têm presença registrada NESTE jogo
  async function carregarPresencas() {
    try {
      setPresencasCarregando(true);
      const idsPresentes = await listarPresencasJogo(jogoId);
      setPresencas(new Set(Array.isArray(idsPresentes) ? idsPresentes : []));
    } catch (err) {
      console.error("Erro ao carregar presenças:", err);
      setPresencas(new Set());
    } finally {
      setPresencasCarregando(false);
    }
  }

  async function handleSalvarJogo() {
    try {
      setCarregando(true);
      setErro(null);
      setMensagem(null);

      const dados = {
        nome,
        admin_login: 1,
        id_sala: salaId ? Number(salaId) : null,
      };

      if (isEditando) {
        await editarJogo(jogoId, dados);
        setMensagem("Jogo atualizado com sucesso!");
      } else {
        await criarJogo(dados);
        setMensagem("Jogo criado com sucesso!");
        const destino = salaId ? `/historico?salaId=${salaId}` : "/historico";
        setTimeout(() => navigate(destino), 1500);
      }
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.message || "Erro ao salvar jogo");
    } finally {
      setCarregando(false);
    }
  }

  // Presença é registrada/removida no JOGO atual (jogoId), não na sala inteira
  async function handleTogglePresenca(aluno) {
    const idAluno = aluno.id || aluno.id_aluno;

    const novasPresencas = new Set(presenças);

    try {
      if (novasPresencas.has(idAluno)) {
        await deletarPresenca(aluno.cgm, jogoId);
        novasPresencas.delete(idAluno);
      } else {
        await registrarPresenca(aluno.cgm, jogoId);
        novasPresencas.add(idAluno);
      }

      setPresencas(novasPresencas);
      setErro(null);
    } catch (err) {
      console.error("Erro na requisição:", err);

      if (err.response?.status === 409) {
        setErro("Presença já registrada");
      } else {
        setErro("Erro ao atualizar presença");
      }
    }
  }

  function handleCancelar() {
    navigate(salaId ? `/historico?salaId=${salaId}` : "/historico");
  }

  return (
    <div className="criar-editar-jogo-page">
      <Header />

      <div className="faixa-tribal" />

      <main className="cea-main">
        <div className="cea-container">
          <h1 className="cea-titulo">
            {isEditando ? "Editar Jogo" : "Criar Novo Jogo"}
          </h1>

          {/* Formulário do Jogo */}
          <div className="cea-card">
            <div className="cea-form">
              <div className="form-group">
                <label>Nome do Jogo *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: Jogo das Plantas"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  disabled={carregando}
                  required
                />
              </div>

              {erro && <div className="form-erro">{erro}</div>}
              {mensagem && <div className="form-sucesso">{mensagem}</div>}

              <div className="form-botoes">
                <button
                  className="btn btn-salvar"
                  onClick={handleSalvarJogo}
                  disabled={carregando || !nome.trim()}
                >
                  {carregando ? "Salvando..." : isEditando ? "Atualizar" : "Criar"}
                </button>
                <button
                  className="btn btn-cancelar"
                  onClick={handleCancelar}
                  disabled={carregando}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>

          {/* Registro de Presenças */}
          {isEditando && salaId && (
            <div className="cea-card cea-presencas">
              <div className="cea-presencas-header">
                <h2>Registrar Presenças</h2>
                <span className="presencas-info">
                  {presenças.size} de {alunos.length} alunos
                </span>
              </div>

              {alunosCarregando || presencasCarregando ? (
                <p className="carregando">Carregando alunos...</p>
              ) : alunos.length === 0 ? (
                <p className="sem-alunos">Nenhum aluno nesta sala</p>
              ) : (
                <div className="presencas-grid">
                  {alunos.map((aluno) => (
                    <div
                      key={aluno.id || aluno.id_aluno}
                      className={`presenca-item ${
                        presenças.has(aluno.id || aluno.id_aluno) ? "presente" : "ausente"
                      }`}
                      onClick={() => handleTogglePresenca(aluno)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="presenca-checkbox">
                        {presenças.has(aluno.id || aluno.id_aluno) && (
                          <span className="checkmark">✓</span>
                        )}
                      </div>
                      <div className="presenca-info">
                        <p className="presenca-nome">{aluno.nome}</p>
                        <p className="presenca-id">CGM: {aluno.cgm}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <div className="faixa-tribal faixa-bottom" />
    </div>
  );
}

export default CriarEditarJogo;