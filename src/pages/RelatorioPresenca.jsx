import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header_professor";
import "./RelatorioPresenca.css";

const MOCK_ALUNOS = [
  { id: "001", nome: "Ana Souza",     presencas: 18, faltas: 2, total: 20 },
  { id: "002", nome: "Bruno Lima",    presencas: 15, faltas: 5, total: 20 },
  { id: "003", nome: "Carla Mendes",  presencas: 20, faltas: 0, total: 20 },
  { id: "004", nome: "Diego Ramos",   presencas: 10, faltas: 10, total: 20 },
  { id: "006", nome: "Eduarda Neves", presencas: 17, faltas: 3, total: 20 },
  { id: "007", nome: "Gustavo lima", presencas: 2, faltas: 18, total: 20 },
  { id: "008", nome: "Jailson Mendes", presencas: 1, faltas: 19, total: 20 },
  { id: "009", nome: "Breno Felipe", presencas: 0, faltas: 20, total: 20 },
  { id: "010", nome: "Rodolfo gomes", presencas: 15, faltas: 5, total: 20 },
];

function StatusBadge({ pct }) {
  if (pct >= 75) return <span className="rp-badge rp-badge--ok">Regular</span>;
  if (pct >= 50) return <span className="rp-badge rp-badge--atencao">Atenção</span>;
  return <span className="rp-badge rp-badge--reprovado">Reprovado</span>;
}

function RelatorioPresenca() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");

  const filtrados = MOCK_ALUNOS.filter(
    (a) =>
      a.nome.toLowerCase().includes(busca.toLowerCase()) ||
      a.id.includes(busca)
  );

  return (
    <>
      <Header />

      <main className="rp-main">
        {/* Título da página */}
        <div className="rp-titulo-wrapper">
          <span className="rp-titulo">Relatório de Presença</span>
        </div>

        {/* Card principal */}
        <div className="rp-card">

          {/* Barra de busca */}
          <div className="rp-busca-wrapper">
            <input
              className="rp-busca"
              type="text"
              placeholder="Buscar aluno ou identificador..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          {/* Tabela */}
          <div className="rp-tabela-wrapper">
            {/* Cabeçalho */}
            <div className="rp-row rp-row--header">
              <span className="rp-col rp-col--nome">Nome do aluno</span>
              <span className="rp-col rp-col--id">Identificador</span>
              <span className="rp-col rp-col--num">Presenças</span>
              <span className="rp-col rp-col--num">Faltas</span>
              <span className="rp-col rp-col--num">% Freq.</span>
              <span className="rp-col rp-col--status">Status</span>
            </div>

            {/* Linhas */}
            {filtrados.length === 0 ? (
              <p className="rp-vazio">Nenhum aluno encontrado.</p>
            ) : (
              filtrados.map((aluno) => {
                const pct = Math.round((aluno.presencas / aluno.total) * 100);
                return (
                  <div key={aluno.id} className="rp-row rp-row--data">
                    <span className="rp-col rp-col--nome">{aluno.nome}</span>
                    <span className="rp-col rp-col--id">{aluno.id}</span>
                    <span className="rp-col rp-col--num">{aluno.presencas}</span>
                    <span className="rp-col rp-col--num">{aluno.faltas}</span>
                    <span className="rp-col rp-col--num">{pct}%</span>
                    <span className="rp-col rp-col--status">
                      <StatusBadge pct={pct} />
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
            <button className="rp-btn-exportar" onClick={() => alert("Exportar PDF")}>
              Exportar
            </button>
          </div>

        </div>
      </main>
    </>
  );
}

export default RelatorioPresenca;