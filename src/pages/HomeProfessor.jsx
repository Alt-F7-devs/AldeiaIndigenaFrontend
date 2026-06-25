import "./HomeProfessor.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../img/logo.svg";
import { listarAvisos } from "../services/api";

const CURIOSIDADES = [
  { texto: "texto esclarecendo duvidas e curiosidades sobre temas relevantes ou sobre o uso do sistema" },
  { texto: "outra curiosidade interessante sobre o sistema ou sobre temas educacionais relevantes" },
  { texto: "mais uma curiosidade para enriquecer o conhecimento dos professores e alunos" },
];

function HomeProfessor() {
  const navigate = useNavigate();
  const ehAdmin = localStorage.getItem("tipo") === "ADMIN";

  const [slide, setSlide] = useState(0);
  const [disponivel, setDisponivel] = useState(null);
  const [avisos, setAvisos] = useState([]);
  const [muralIndex, setMuralIndex] = useState(0);
  const [popupAberto, setPopupAberto] = useState(false);

  useEffect(() => {
    setAvisos(listarAvisos());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % CURIOSIDADES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleMuralPrev = () => { if (muralIndex > 0) setMuralIndex(muralIndex - 1); };
  const handleMuralNext = () => { if (muralIndex < avisos.length - 3) setMuralIndex(muralIndex + 1); };
  const avisosVisiveis = avisos.slice(muralIndex, muralIndex + 3);

  function excluirAviso(id) {
    const novosAvisos = avisos.filter((a) => a.id !== id);
    localStorage.setItem("avisos", JSON.stringify(novosAvisos));
    setAvisos(novosAvisos);
    setMuralIndex(0);
  }

  return (
    <>
      <Header />

      {popupAberto && (
        <div className="ha-modal-overlay" onClick={() => setPopupAberto(false)}>
          <div className="hp-popup" onClick={(e) => e.stopPropagation()}>
            <div className="hp-popup-header">
              <span>Gerenciar Avisos</span>
              <button className="ha-modal-close" onClick={() => setPopupAberto(false)}>✕</button>
            </div>
            <div className="hp-popup-lista">
              {avisos.length === 0 ? (
                <p className="hp-popup-vazio">Nenhum aviso publicado ainda.</p>
              ) : (
                avisos.map((aviso) => (
                  <div key={aviso.id} className="hp-popup-item">
                    {aviso.imagem && (
                      <img src={aviso.imagem} alt={aviso.titulo} className="hp-popup-img" />
                    )}
                    <div className="hp-popup-info">
                      <span className="hp-popup-titulo">{aviso.titulo}</span>
                      <p className="hp-popup-desc">{aviso.descricao}</p>
                      <small>{aviso.data ? new Date(aviso.data).toLocaleDateString("pt-BR") : ""}</small>
                    </div>
                    <button className="hp-popup-excluir" onClick={() => excluirAviso(aviso.id)}>🗑</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <div className="hp-page">
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

        <div className="hp-salas-sec">
          <button className="hp-btn-salas" onClick={() => navigate("/sala-professor")}>
            Salas de aula
          </button>
          {ehAdmin && (
            <button className="hp-btn-salas hp-btn-cadastro" onClick={() => navigate("/cadastro")}>
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

        <div className="hp-disp-sec">
          <div className="hp-disp-top">
            <button className="hp-btn-disp">Estou disponível?</button>
            <img className="hp-moeda" src={logo} alt="Logo" />
          </div>
          <div className="hp-sala-card">
            <div className="hp-sala-esq">
              <div className="hp-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="22px" height="22px">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
              <span className="hp-sala-nome">Nome - Matéria</span>
            </div>
            <div className="hp-sala-btns">
              <button className={`hp-btn-nao ${disponivel === "nao" ? "hp-btn--ativo" : ""}`} onClick={() => setDisponivel(disponivel === "nao" ? null : "nao")}>Não</button>
              <button className={`hp-btn-sim ${disponivel === "sim" ? "hp-btn--ativo" : ""}`} onClick={() => setDisponivel(disponivel === "sim" ? null : "sim")}>Sim</button>
            </div>
          </div>
        </div>

        <div className="hp-mural-sec">
          <div className="hp-mural-outer">
            <button className="hp-nav-btn hp-nav-left" onClick={handleMuralPrev} disabled={muralIndex === 0}>&#8592;</button>
            <button className="hp-nav-btn hp-nav-right" onClick={handleMuralNext} disabled={muralIndex >= avisos.length - 3}>&#8594;</button>
            <div className="hp-mural-inner">
              <div className="hp-mural-titulo">Mural de avisos</div>
              <div className="hp-mural-cards">
                {avisosVisiveis.length === 0 ? (
                  <p style={{ textAlign: "center", width: "100%" }}>Nenhum aviso publicado ainda.</p>
                ) : (
                  avisosVisiveis.map((aviso) => (
                    <div key={aviso.id} className="hp-mural-card">
                      {aviso.imagem && <img src={aviso.imagem} alt={aviso.titulo} className="hp-mural-img" />}
                      <p>{aviso.descricao}</p>
                      <span>{aviso.titulo}</span>
                      <small>{aviso.data ? new Date(aviso.data).toLocaleDateString("pt-BR") : ""}</small>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="hp-aviso-row">
            <button className="hp-btn-gerenciar" onClick={() => setPopupAberto(true)}>
              Gerenciar Avisos
            </button>
            <button className="hp-btn-aviso" onClick={() => navigate("/adicionar-aviso")}>
              Adicionar Aviso
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default HomeProfessor;