import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Header from "../components/Header";
import RelatorioPresencaPDF from "./RelatorioPresencaPDF";
import { listarRelatorioFrequencia } from "../services/api";
import "./RelatorioPresenca.css";

function StatusBadge({ status }) {
  if (status === "REGULAR")
    return <span className="rp-badge rp-badge--ok">Regular</span>;
  if (status === "ALERTA")
    return <span className="rp-badge rp-badge--atencao">Alerta</span>;
  return <span className="rp-badge rp-badge--reprovado">Reprovado</span>;
}

function RelatorioPresenca() {
  const [searchParams] = useSearchParams();
  const salaId = searchParams.get("salaId");

  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarRelatorio() {
      try {
        setCarregando(true);
        setErro(null);

        const dados = await listarRelatorioFrequencia();
        const lista = Array.isArray(dados) ? dados : [];

        // Filtra pela sala vinda do Histórico (?salaId=), se houver
        const filtradosPorSala = salaId
          ? lista.filter((a) => String(a.idSala) === String(salaId))
          : lista;

        if (ativo) setAlunos(filtradosPorSala);
      } catch (err) {
        console.error("Erro ao carregar relatório de presença:", err);
        if (ativo) {
          setErro("Erro ao carregar relatório de presença");
          setAlunos([]);
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarRelatorio();
    return () => {
      ativo = false;
    };
  }, [salaId]);

  // Rótulo da sala para título/PDF (numSala da primeira linha)
  const salaLabel = salaId ? alunos[0]?.numSala ?? salaId : null;

  const filtrados = useMemo(() => {
    const termo = busca.toLowerCase();
    return alunos.filter(
      (a) =>
        a.nome?.toLowerCase().includes(termo) ||
        String(a.cgm ?? "").includes(busca)
    );
  }, [alunos, busca]);

  return (
    <>
      <Header />

      <main className="rp-main">
        {/* Título da página */}
        <div className="rp-titulo-wrapper">
          <span className="rp-titulo">
            {salaLabel
              ? `Relatório de Presença — Sala ${salaLabel}`
              : "Relatório de Presença"}
          </span>
        </div>

        {/* Card principal */}
        <div className="rp-card">
          {/* Barra de busca */}
          <div className="rp-busca-wrapper">
            <input
              className="rp-busca"
              type="text"
              placeholder="Buscar aluno ou CGM..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          {/* Tabela */}
          <div className="rp-tabela-wrapper">
            {/* Cabeçalho */}
            <div className="rp-row rp-row--header">
              <span className="rp-col rp-col--nome">Nome do aluno</span>
              <span className="rp-col rp-col--id">CGM</span>
              <span className="rp-col rp-col--sala">Sala</span>
              <span className="rp-col rp-col--num">Presenças</span>
              <span className="rp-col rp-col--num">Faltas</span>
              <span className="rp-col rp-col--num">% Freq.</span>
              <span className="rp-col rp-col--status">Status</span>
            </div>

            {/* Linhas */}
            {carregando ? (
              <p className="rp-vazio">Carregando relatório...</p>
            ) : erro ? (
              <p className="rp-vazio">{erro}</p>
            ) : filtrados.length === 0 ? (
              <p className="rp-vazio">Nenhum aluno encontrado.</p>
            ) : (
              filtrados.map((aluno) => {
                const faltas = Math.max(
                  0,
                  (aluno.totalJogos ?? 0) - (aluno.presencas ?? 0)
                );
                const pct = Math.round(aluno.percentual ?? 0);
                return (
                  <div key={aluno.cgm} className="rp-row rp-row--data">
                    <span className="rp-col rp-col--nome">{aluno.nome}</span>
                    <span className="rp-col rp-col--id">{aluno.cgm}</span>
                    <span className="rp-col rp-col--sala">
                      {aluno.numSala ?? "—"}
                    </span>
                    <span className="rp-col rp-col--num">{aluno.presencas}</span>
                    <span className="rp-col rp-col--num">{faltas}</span>
                    <span className="rp-col rp-col--num">{pct}%</span>
                    <span className="rp-col rp-col--status">
                      <StatusBadge status={aluno.status} />
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Rodapé do card */}
          <div className="rp-rodape">
            <span className="rp-rodape-info">
              Total de alunos: <strong>{filtrados.length}</strong>
            </span>

            {filtrados.length > 0 ? (
              <PDFDownloadLink
                className="rp-btn-exportar"
                document={
                  <RelatorioPresencaPDF
                    linhas={filtrados}
                    salaLabel={salaLabel}
                  />
                }
                fileName={`relatorio-presenca${
                  salaId ? `-sala-${salaLabel}` : ""
                }.pdf`}
              >
                {({ loading }) =>
                  loading ? "Gerando PDF..." : "Exportar PDF"
                }
              </PDFDownloadLink>
            ) : (
              <button className="rp-btn-exportar" disabled>
                Exportar PDF
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default RelatorioPresenca;
