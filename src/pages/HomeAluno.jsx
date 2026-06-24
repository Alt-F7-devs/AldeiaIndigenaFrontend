import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header_aluno";
import Footer from "../components/Footer";
import grafismo from "../img/grafismo.svg";
import userIcon from "../img/do-utilizador.png";
import logo from "../img/logo.svg";
import "./HomeAluno.css";

const professores = [
  { id: 1, nome: "Nome", materia: "Matéria", status: "indisponivel" },
  { id: 2, nome: "Nome", materia: "Matéria", status: "disponivel" },
  { id: 3, nome: "Nome", materia: "Matéria", status: "disponivel" },
];

const avisos = [
  { id: 1, titulo: "Reunião de Pais", descricao: "Haverá reunião de pais e mestres na próxima sexta-feira às 19h." },
  { id: 2, titulo: "Festival Cultural", descricao: "Prepare-se para o festival cultural indígena que acontecerá no próximo mês." },
  { id: 3, titulo: "Avaliação de Língua", descricao: "A avaliação de língua indígena será realizada na semana que vem." },
];

const TribalDivider = () => (
  <div className="ha-tribal" aria-hidden="true">
    <img src={grafismo} alt="" className="ha-tribal-img" />
  </div>
);

export default function HomeAluno() {
  const navigate = useNavigate();
  const [avisoAtivo, setAvisoAtivo] = useState(0);
  const [animando, setAnimando] = useState(false);

  const trocarAviso = (dir) => {
    if (animando) return;
    setAnimando(true);
    setTimeout(() => {
      setAvisoAtivo((prev) => {
        if (dir === "prev") return prev === 0 ? avisos.length - 1 : prev - 1;
        return prev === avisos.length - 1 ? 0 : prev + 1;
      });
      setAnimando(false);
    }, 250);
  };

  const indicesCarrossel = [
    (avisoAtivo - 1 + avisos.length) % avisos.length,
    avisoAtivo,
    (avisoAtivo + 1) % avisos.length,
  ];

  const handleProfessorClick = (prof) => {
    console.log("Professor selecionado:", prof);
  };

  return (
    <>
      <Header />

      <div className="ha-page">

        <section className="ha-curiosidades">
          <TribalDivider />
          <div className="ha-curio-label-wrap">
            <span className="ha-curio-label">Curiosidades</span>
          </div>
          <div className="ha-curio-body">
            <div className="ha-curio-cards">
              <div className="ha-curio-card ha-curio-card--esq" aria-hidden="true" />
              <div className="ha-curio-card ha-curio-card--dir" aria-hidden="true" />
            </div>
            <p className="ha-curio-texto">
              texto esclarecendo dúvidas e curiosidades sobre temas relevantes ou sobre o uso do sistema.
            </p>
          </div>
          <TribalDivider />
        </section>

        <section className="ha-menu">
          <button
            className="ha-menu-btn ha-menu-btn--salas"
            onClick={() => navigate("/sala-aluno")}
          >
            Minhas Salas
          </button>
          <button
            className="ha-menu-btn ha-menu-btn--conquistas"
            onClick={() => navigate("/conquistas")}
          >
            Minhas Conquistas
          </button>
          <TribalDivider />
        </section>

        <section className="ha-professores">
          <div className="ha-prof-header">
            <span className="ha-prof-label">Dúvidas? Fale com um professor</span>
            <div className="ha-prof-logo">
              <img src={logo} alt="Logo" className="ha-prof-logo-img" />
            </div>
          </div>
          <div className="ha-prof-lista">
            {professores.map((prof) => (
              <button
                key={prof.id}
                className="ha-prof-card"
                onClick={() => handleProfessorClick(prof)}
                aria-label={`${prof.nome} - ${prof.materia}`}
              >
                <div className="ha-prof-card-left">
                  <div className="ha-prof-icon-wrap">
                    <img src={userIcon} alt="" className="ha-prof-icon" />
                  </div>
                  <span className="ha-prof-nome">{prof.nome} - {prof.materia}</span>
                </div>
                <span className={`ha-prof-status ${prof.status === "disponivel" ? "ha-prof-status--disp" : "ha-prof-status--indisp"}`}>
                  {prof.status === "disponivel" ? "Disponível" : "Indisponível"}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="ha-mural">
          <TribalDivider />
          <div className="ha-mural-container">
            <div className="ha-mural-painel">
              <div className="ha-mural-aba">Mural de avisos</div>
              <div className="ha-mural-carrossel">
                <button className="ha-mural-seta" onClick={() => trocarAviso("prev")} aria-label="Aviso anterior">
                  &#8592;
                </button>
                <div className="ha-mural-cards">
                  {indicesCarrossel.map((idx, pos) => (
                    <div
                      key={avisos[idx].id}
                      className={`ha-mural-card ${pos === 1 ? "ha-mural-card--ativo" : "ha-mural-card--lateral"} ${animando ? "ha-mural-card--animando" : ""}`}
                    >
                      <h3 className="ha-mural-card-titulo">{avisos[idx].titulo}</h3>
                      <p className="ha-mural-card-desc">{avisos[idx].descricao}</p>
                    </div>
                  ))}
                </div>
                <button className="ha-mural-seta" onClick={() => trocarAviso("next")} aria-label="Próximo aviso">
                  &#8594;
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}