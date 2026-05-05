import React, { useState } from "react";
import Header from "../components/Header";
import "./ConquistasAluno.css";

function ConquistasAluno() {
  const conquistas = [
    { atividade: "Missão das Frações", materia: "Matemática", data: "12/04/2025", cor: "vermelho" },
    { atividade: "Leitura Silenciosa", materia: "Português", data: "18/04/2025", cor: "azul" },
    { atividade: "Sistema Solar", materia: "Ciências", data: "22/04/2025", cor: "marrom" },
    { atividade: "Mapa do Brasil", materia: "Geografia", data: "25/04/2025", cor: "verde" },
  ];

    return (
    <div className="conquistaspage">
      <Header />
      <div className="faixa-tribal" />
      <div className="conquistas-wrapper">
        <div className="conquistas-box">
          <h2 className="conquistas-titulo">Minhas conquistas</h2>
          <div className="conquistas-lista">
            {conquistas.map((c, i) => (
              <div key={i} className={`conquista-item conquista-${c.cor}`}>
                <span className="conquista-nome">{c.atividade} – {c.materia}</span>
                <span className="conquista-data">{c.data}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="faixa-tribal" />
    </div>
    );
}
export default ConquistasAluno;  