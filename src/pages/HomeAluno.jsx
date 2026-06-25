import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import grafismo from "../img/grafismo.svg";
import userIcon from "../img/do-utilizador.png";
import logo from "../img/logo.svg";
import "./HomeAluno.css";

const professoresBase = [
  { id: 1, nome: "Nome", materia: "Matéria", status: "indisponivel" },
  { id: 2, nome: "Nome", materia: "Matéria", status: "disponivel" },
  { id: 3, nome: "Nome", materia: "Matéria", status: "disponivel" },
];

const CURIOSIDADES = [
  { texto: "texto esclarecendo duvidas e curiosidades sobre temas relevantes ou sobre o uso do sistema" },
  { texto: "outra curiosidade interessante sobre o sistema ou sobre temas educacionais relevantes" },
  { texto: "mais uma curiosidade para enriquecer o conhecimento dos professores e alunos" },
];

const TribalDivider = () => (
  <div className="ha-tribal">
   
  </div>
);

export default function HomeAluno() {
  const navigate = useNavigate();
  const [avisos, setAvisos] = useState([]);
  const [index, setIndex] = useState(0);
  const [slide, setSlide] = useState(0);
  const [professores, setProfessores] = useState(professoresBase);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("avisos")) || [];
    setAvisos(dados);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % CURIOSIDADES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // lê a disponibilidade salva pelos professores e atualiza os cards
  useEffect(() => {
    const aplicarDisponibilidade = () => {
      const dispMap = JSON.parse(localStorage.getItem("disponibilidade")) || {};
      setProfessores(
        professoresBase.map((p) => {
          const chave = `${p.nome} - ${p.materia}`;
          if (dispMap[chave] === "sim") return { ...p, status: "disponivel" };
          if (dispMap[chave] === "nao") return { ...p, status: "indisponivel" };
          return p;
        })
      );
    };

    aplicarDisponibilidade(); // ao abrir

    // atualiza quando o professor mudar em outra aba/janela
    window.addEventListener("storage", aplicarDisponibilidade);
    // atualiza também na mesma aba (a cada 2s)
    const intervalo = setInterval(aplicarDisponibilidade, 2000);

    return () => {
      window.removeEventListener("storage", aplicarDisponibilidade);
      clearInterval(intervalo);
    };
  }, []);

  const next = () => { if (index + 3 < avisos.length) setIndex((prev) => prev + 1); };
  const prev = () => { if (index > 0) setIndex((prev) => prev - 1); };
  const visible = avisos.slice(index, index + 3);

  return (
    <>
      <Header />

      <div className="ha-page">

        <section className="ha-curiosidades">
          <div className="hp-faixa-curiosidades">
            <img className="hp-grafismo" src="/img/grafismo.svg" alt="" />
            <div className="hp-curio-tab">Curiosidades</div>
            <img className="hp-grafismo" src="/img/grafismo.svg" alt="" />
          </div>

          <div className="hp-curio-box">
            <div className="hp-curio-cards">
              <div className="hp-curio-img hp-curio-img--grande" />
              <div className="hp-curio-img hp-curio-img--pequeno" />
            </div>
            <div className="hp-curio-conteudo">
              {CURIOSIDADES.map((item, i) => (
                <p key={i} className={`hp-curio-texto ${i === slide ? "hp-curio-texto--ativo" : ""}`}>
                  {item.texto}
                </p>
              ))}
            </div>
            <div className="hp-curio-dots">
              {CURIOSIDADES.map((_, i) => (
                <button key={i} className={`hp-dot ${i === slide ? "hp-dot--ativo" : ""}`} onClick={() => setSlide(i)} />
              ))}
            </div>
          </div>
        </section>

        <section className="ha-menu">
          <button className="ha-menu-btn ha-menu-btn--salas" onClick={() => navigate("/sala-aluno")}>
            Minhas Salas
          </button>
          <button className="ha-menu-btn ha-menu-btn--conquistas" onClick={() => navigate("/conquistas")}>
            Minhas Conquistas
          </button>
          <TribalDivider />
        </section>

        <section className="ha-professores">
          <div className="ha-prof-header">
            <span className="ha-prof-label">Fale com um professor</span>
            <div className="ha-prof-logo">
              <img src={logo} alt="" className="ha-prof-logo-img" />
            </div>
          </div>
          <div className="ha-prof-lista">
            {professores.map((p) => (
              <div key={p.id} className="ha-prof-card">
                <div className="ha-prof-card-left">
                  <img src={userIcon} className="ha-prof-icon" alt="" />
                  <span>{p.nome} - {p.materia}</span>
                </div>
                <span className={p.status === "disponivel" ? "ha-prof-status ha-prof-status--disp" : "ha-prof-status ha-prof-status--indisp"}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="hp-mural-sec">
          <div className="hp-mural-outer">
            <div className="hp-mural-inner">
              <div className="hp-mural-titulo">Mural de avisos</div>
              <button className="hp-nav-btn hp-nav-left" onClick={prev} disabled={index === 0}>&#8592;</button>
              <button className="hp-nav-btn hp-nav-right" onClick={next} disabled={index + 3 >= avisos.length}>&#8594;</button>
              <div className="hp-mural-cards">
                {visible.length === 0 ? (
                  <p style={{ textAlign: "center", width: "100%" }}>Nenhum aviso publicado ainda.</p>
                ) : (
                  visible.map((aviso) => (
                    <div key={aviso.id} className="hp-mural-card">
                      {aviso.imagem && (
                        <img src={aviso.imagem} alt="imagem do aviso" className="hp-mural-img" />
                      )}
                      <p>{aviso.descricao}</p>
                      <span>{aviso.titulo}</span>
                      <small>{aviso.data ? new Date(aviso.data).toLocaleDateString("pt-BR") : ""}</small>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}