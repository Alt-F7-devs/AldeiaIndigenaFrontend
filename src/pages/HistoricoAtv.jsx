import React, { useState } from "react";
import Header from "../components/Header";
import "./HistoricoAtv.css";

// Dados de exemplo — substitua pelos seus dados reais
const dadosExemplo = [
  { id: 1, nome: "Atividade das Plantas", data: "10/04/2025", alunos: 12 },
  { id: 2, nome: "Quiz da Floresta", data: "15/04/2025", alunos: 8 },
  { id: 3, nome: "Caça ao Tesouro", data: "18/04/2025", alunos: 15 },
];

function HistoricoAtv() {
  const [atividades] = useState(dadosExemplo);

  return (
    <div className="historico-page">

      <Header />

      <div className="faixa-tribal" />

      <main className="historico-main">

        <div className="historico-titulo-wrapper">
          <span className="historico-titulo">Histórico</span>
        </div>

        <div className="historico-card">
          <div className="tabela-header">
            <div className="tabela-col col-nome">Nome da atividade</div>
            <div className="tabela-col col-data">Data</div>
            <div className="tabela-col col-alunos">Alunos que fizeram</div>
          </div>
          <div className="tabela-corpo">
            {atividades.length === 0 ? (
              <p className="tabela-vazia">Nenhuma atividade registrada.</p>
            ) : (
              atividades.map((a) => (
                <div className="tabela-linha" key={a.id}>
                  <div className="tabela-col col-nome">{a.nome}</div>
                  <div className="tabela-col col-data">{a.data}</div>
                  <div className="tabela-col col-alunos">{a.alunos}</div>
                </div>
              ))
            )}
          </div>

        </div>
      </main>

      <div className="faixa-tribal faixa-bottom" />
    </div>
  );
}

export default HistoricoAtv;