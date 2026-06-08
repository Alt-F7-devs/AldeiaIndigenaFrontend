import "./HomeProfessor.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../img/logo.svg";

const CURIOSIDADES = [
  {
    texto: "texto esclarecendo duvidas e curiosidades sobre temas relevantes ou sobre o uso do sistema",
  },
  {
    texto: "outra curiosidade interessante sobre o sistema ou sobre temas educacionais relevantes",
  },
  {
    texto: "mais uma curiosidade para enriquecer o conhecimento dos professores e alunos",
  },
];

function HomeProfessor() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % CURIOSIDADES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Header />

      <div className="hp-page">

        {/* FAIXA + CURIOSIDADES */}
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
              <p
                key={i}
                className={`hp-curio-texto ${i === slide ? "hp-curio-texto--ativo" : ""}`}
              >
                {item.texto}
              </p>
            ))}
          </div>

          <div className="hp-curio-dots">
            {CURIOSIDADES.map((_, i) => (
              <button
                key={i}
                className={`hp-dot ${i === slide ? "hp-dot--ativo" : ""}`}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>
        </div>

        <img className="hp-faixa" src="/img/grafismo.svg" alt="" />

        {/* SALAS */}
        <div className="hp-salas-sec">
          <button className="hp-btn-salas" onClick={() => navigate("/sala")}>
            Salas de aula
          </button>
        </div>

        <img className="hp-faixa" src="/img/grafismo.svg" alt="" />

        {/* DISPONIBILIDADE */}
        <div className="hp-disp-sec">
          <div className="hp-disp-top">
            <button className="hp-btn-disp">Estou disponível?</button>
           
        <img className="hp-moeda" src="/img/logo.svg" alt="" />

          </div>

          <div className="hp-sala-card">
            <div className="hp-sala-esq">
              <div className="hp-avatar">👤</div>
              <span className="hp-sala-nome">Nome - Matéria</span>
            </div>
            <div className="hp-sala-btns">
              <button className="hp-btn-nao">Não</button>
              <button className="hp-btn-sim">Sim</button>
            </div>
          </div>
        </div>

        <img className="hp-faixa" src="/img/grafismo.svg" alt="" />

        {/* MURAL DE AVISOS */}
        <div className="hp-mural-sec">
          <div className="hp-mural-outer">
            <button className="hp-nav-btn hp-nav-left">&#8592;</button>
            <button className="hp-nav-btn hp-nav-right">&#8594;</button>
            <div className="hp-mural-inner">
              <div className="hp-mural-titulo">Mural de avisos</div>
              <div className="hp-mural-cards">
                <div className="hp-mural-card" />
                <div className="hp-mural-card" />
                <div className="hp-mural-card" />
              </div>
            </div>
          </div>
          <div className="hp-aviso-row">
            <button className="hp-btn-aviso">Adicionar Aviso</button>
          </div>
        </div>

        <img className="hp-faixa" src="/img/grafismo.svg" alt="" />

      </div>
    </>
  );
}

export default HomeProfessor;