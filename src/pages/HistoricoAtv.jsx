import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import "./HistoricoAtv.css";
import { listarJogosResumo, listarJogosResumoPorSala } from "../services/api";

function HistoricoAtv() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const salaId = searchParams.get("salaId");

  const [atividades, setAtividades] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    carregarAtividades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salaId]);

  async function carregarAtividades() {
    try {
      setCarregando(true);
      setErro(null);

      const dados = salaId
        ? await listarJogosResumoPorSala(salaId)
        : await listarJogosResumo();

      const lista = Array.isArray(dados) ? dados : [];

      const normalizado = lista.map((jogo) => ({
        id: jogo.id_jogo,
        nome: jogo.nome,
        data: jogo.data
          ? new Date(jogo.data).toLocaleDateString("pt-BR")
          : "—",
        alunos: jogo.alunos ?? 0,
        idSala: jogo.id_sala,
      }));

      setAtividades(normalizado);
    } catch (err) {
      console.error("Erro ao carregar atividades:", err);
      setErro("Erro ao carregar atividades");
      setAtividades([]);
    } finally {
      setCarregando(false);
    }
  }

  function handleCriarNovaAtividade() {
    navigate("/criar-jogo");
  }

  function handleEditarAtividade(id, idSalaJogo) {
    if (idSalaJogo) {
      navigate(`/editar-jogo/${id}/${idSalaJogo}`);
    } else {
      navigate(`/editar-jogo/${id}`);
    }
  }

  return (
    <div className="historico-page">
      <Header />

      <main className="historico-main">
        <div className="historico-titulo-wrapper">
          <span className="historico-titulo">
            {salaId ? `Histórico de Atividades — Sala ${salaId}` : "Histórico de Atividades"}
          </span>
        </div>

        {erro && (
          <div className="historico-erro">
            {erro}
            <button onClick={carregarAtividades} className="btn-recarregar">
              Tentar novamente
            </button>
          </div>
        )}

        <div className="historico-card">
          <div className="tabela-header">
            <div className="tabela-col col-nome">Nome da atividade</div>
            <div className="tabela-col col-data">Data</div>
            <div className="tabela-col col-alunos">Alunos que fizeram</div>
            <div className="tabela-col col-acoes">Ações</div>
          </div>
          <div className="tabela-corpo">
            {carregando ? (
              <p className="tabela-carregando">Carregando atividades...</p>
            ) : atividades.length === 0 ? (
              <p className="tabela-vazia">Nenhuma atividade registrada.</p>
            ) : (
              atividades.map((a) => (
                <div className="tabela-linha" key={a.id}>
                  <div className="tabela-col col-nome">{a.nome}</div>
                  <div className="tabela-col col-data">{a.data}</div>
                  <div className="tabela-col col-alunos">{a.alunos}</div>
                  <div className="tabela-col col-acoes">
                    <button
                      className="btn-editar"
                      onClick={() => handleEditarAtividade(a.id, a.idSala)}
                      title="Editar atividade e registrar presenças"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HistoricoAtv;