import "./HomeProfessor.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";




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
  const ehAdmin = localStorage.getItem("tipo") === "ADMIN";
  const [slide, setSlide] = useState(0);
  const [disponivel, setDisponivel] = useState(null);
  const [avisos, setAvisos] = useState([1, 2, 3]);
  const [muralIndex, setMuralIndex] = useState(0);


  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % CURIOSIDADES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);


  const handleAdicionarAviso = () => {
    setAvisos((prev) => [...prev, prev.length + 1]);
  };


  const handleMuralPrev = () => {
    setMuralIndex((prev) => Math.max(0, prev - 1));
  };


  const handleMuralNext = () => {
    setMuralIndex((prev) => Math.min(avisos.length - 3, prev + 1));
  };


  const avisosVisiveis = avisos.slice(muralIndex, muralIndex + 3);


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
          <button className="hp-btn-salas" onClick={() => navigate("/sala-professor")}>
            Salas de aula
          </button>
          {ehAdmin && (
            <button
              className="hp-btn-salas hp-btn-cadastro"
              onClick={() => navigate("/cadastro")}
            >
              Cadastrar usuários
            </button>
          )}
          {ehAdmin && (
            <button
              className="hp-btn-salas hp-btn-relatorios"
              onClick={() => navigate("/relatoriopresenca")}
            >
              Relatórios
            </button>
          )}
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
              <div className="hp-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="22px" height="22px">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
              </div>
              <span className="hp-sala-nome">Nome - Matéria</span>
            </div>
            <div className="hp-sala-btns">
              <button
                className={`hp-btn-nao ${disponivel === "nao" ? "hp-btn--ativo" : ""}`}
                onClick={() => setDisponivel(disponivel === "nao" ? null : "nao")}
              >
                Não
              </button>
              <button
                className={`hp-btn-sim ${disponivel === "sim" ? "hp-btn--ativo" : ""}`}
                onClick={() => setDisponivel(disponivel === "sim" ? null : "sim")}
              >
                Sim
              </button>
            </div>
          </div>
        </div>


        <img className="hp-faixa" src="/img/grafismo.svg" alt="" />


        {/* MURAL DE AVISOS */}
        <div className="hp-mural-sec">
          <div className="hp-mural-outer">
            <button
              className="hp-nav-btn hp-nav-left"
              onClick={handleMuralPrev}
              disabled={muralIndex === 0}
            >
              &#8592;
            </button>
            <button
              className="hp-nav-btn hp-nav-right"
              onClick={handleMuralNext}
              disabled={muralIndex >= avisos.length - 3}
            >
              &#8594;
            </button>
            <div className="hp-mural-inner">
              <div className="hp-mural-titulo">Mural de avisos</div>
              <div className="hp-mural-cards">
                {avisosVisiveis.map((id) => (
                  <div key={id} className="hp-mural-card" />
                ))}
              </div>
            </div>
          </div>
          <div className="hp-aviso-row">
            <button className="hp-btn-aviso" onClick={handleAdicionarAviso}>
              Adicionar Aviso
            </button>
          </div>
        </div>


        <img className="hp-faixa" src="/img/grafismo.svg" alt="" />


      </div>
      <Footer />
    </>
  );
}


export default HomeProfessor;
