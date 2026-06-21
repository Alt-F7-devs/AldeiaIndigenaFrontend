import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { listarPresencasDoAluno } from "../services/api";
import "./ConquistasAluno.css";

const CORES = ["vermelho", "azul", "marrom", "verde"];

function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

function ConquistasAluno() {
  const [conquistas, setConquistas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarConquistas() {
      const cgm = localStorage.getItem("cgm");

      if (!cgm) {
        setErro("Aluno não identificado. Faça login novamente.");
        setCarregando(false);
        return;
      }

      try {
        const dados = await listarPresencasDoAluno(cgm);
        setConquistas(dados);
      } catch (err) {
        setErro("Erro ao carregar conquistas.");
        console.error(err);
      } finally {
        setCarregando(false);
      }
    }

    carregarConquistas();
  }, []);

  return (
    <>
      <Header />

      <div className="conquistaspage">
        <div className="conquistas-wrapper">
          <div className="conquistas-box">
            <h2 className="conquistas-titulo">Minhas conquistas</h2>

            {carregando && <p className="conquistas-status">Carregando...</p>}
            {erro && <p className="conquistas-status">{erro}</p>}
            {!carregando && !erro && conquistas.length === 0 && (
              <p className="conquistas-status">Nenhuma conquista registrada ainda.</p>
            )}

            <div className="conquistas-lista">
              {conquistas.map((c, i) => (
                <div
                  key={c.idJogo}
                  className={`conquista-item conquista-${CORES[i % CORES.length]}`}
                >
                  <span className="conquista-nome">{c.nomeJogo}</span>
                  <span className="conquista-data">{formatarData(c.dataJogo)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConquistasAluno;