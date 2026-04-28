import React, { useState } from "react";
import Header from "../components/Header";
import "./BibliotecaJogos.css";

const jogosIniciais = [
  { id: 1, nome: "Nome do jogo", descricao: "descrição", imagem: null },
  { id: 2, nome: "Nome do jogo", descricao: "descrição", imagem: null },
  { id: 3, nome: "Nome do jogo", descricao: "descrição", imagem: null },
  { id: 4, nome: "Nome do jogo", descricao: "descrição", imagem: null },
];

function BibliotecaJogos({ jogos = jogosIniciais, onAdicionar }) {
  const [selecionado, setSelecionado] = useState(jogos[0]?.id ?? null);

  function handleAdicionar(e, jogo) {
    e.stopPropagation();
    if (onAdicionar) onAdicionar(jogo);
  }

  return (
    <div className="jogospage">
      <Header />
      <div className="faixa-tribal"></div>
      <div className="biblioteca-titulo">Biblioteca de jogos</div>
      <div className="biblioteca-container">
        <div className="biblioteca-grid">
          {jogos.map((jogo) => (
            <div
              key={jogo.id}
              className={`jogo-card${selecionado === jogo.id ? " selecionado" : ""}`}
              onClick={() => setSelecionado(jogo.id)}
            >
              <div className="jogo-imagem">
                {jogo.imagem ? (
                  <img src={jogo.imagem} alt={jogo.nome} />
                ) : (
                  <div className="jogo-imagem-placeholder" />
                )}
              </div>
              <div className="jogo-info">
                <div className="jogo-texto">
                  <p className="jogo-nome">{jogo.nome}</p>
                  <p className="jogo-descricao">{jogo.descricao}</p>
                </div>
                <button
                  className="jogo-botao-add"
                  onClick={(e) => handleAdicionar(e, jogo)}
                  title="Adicionar jogo"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BibliotecaJogos;