import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import userIcon from "../img/do-utilizador.png";
import logo from "../img/logo.svg";
import emailjs from "@emailjs/browser";
import "./HomeAluno.css";

emailjs.init("WVBOMIdj0VNBcoAwE");

const professoresBase = [
  { id: 1, nome: "Professor André", materia: "Matéria", status: "indisponivel", email: "andre@email.com" },
  { id: 2, nome: "Professor Marcelo", materia: "Matéria", status: "disponivel", email: "euduardavitoria90@gmail.com" },
  { id: 3, nome: "Professor Adriano", materia: "Matéria", status: "disponivel", email: "euduardavitoria90@gmail.com" },
];

const CURIOSIDADES = [
  { texto: "Sabia que você pode ganhar conquistas no sistema? Cada atividade concluída te aproxima de um novo troféu! Continue se dedicando e colecione todas as suas conquistas." },
  { texto: "Fique por dentro de tudo! Seu professor pode deixar avisos importantes no Mural de Avisos. Acesse sua página inicial sempre que quiser ver as novidades da sua escola." },
  { texto: "Cada sala do sistema representa uma matéria real da sua escola. Dentro dela você encontra atividades, materiais e pode entrar em contato com seu professor quando precisar de ajuda." },
];

export default function HomeAluno() {
  const navigate = useNavigate();
  const [avisos, setAvisos] = useState([]);
  const [index, setIndex] = useState(0);
  const [slide, setSlide] = useState(0);
  const [professores, setProfessores] = useState(professoresBase);

  const [popupDuvida, setPopupDuvida] = useState(false);
  const [profSelecionado, setProfSelecionado] = useState(null);
  const [alunoNomeInput, setAlunoNomeInput] = useState("");
  const [sala, setSala] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");

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

    aplicarDisponibilidade();
    window.addEventListener("storage", aplicarDisponibilidade);
    const intervalo = setInterval(aplicarDisponibilidade, 2000);

    return () => {
      window.removeEventListener("storage", aplicarDisponibilidade);
      clearInterval(intervalo);
    };
  }, []);

  const next = () => { if (index + 3 < avisos.length) setIndex((prev) => prev + 1); };
  const prev = () => { if (index > 0) setIndex((prev) => prev - 1); };
  const visible = avisos.slice(index, index + 3);

  function abrirPopup(prof) {
    if (prof.status !== "disponivel") return;
    setProfSelecionado(prof);
    setMensagem("");
    setAlunoNomeInput("");
    setSala("");
    setFeedbackMsg("");
    setPopupDuvida(true);
  }

  function fecharPopup() {
    setPopupDuvida(false);
    setProfSelecionado(null);
    setMensagem("");
    setAlunoNomeInput("");
    setSala("");
    setFeedbackMsg("");
  }

  async function enviarDuvida() {
    if (!alunoNomeInput.trim() || !sala.trim() || !mensagem.trim()) {
      setFeedbackMsg("Preencha todos os campos antes de enviar.");
      return;
    }

    setEnviando(true);
    setFeedbackMsg("");

    try {
      await emailjs.send("service_q8v9gbc", "template_te52c0i", {
        aluno_nome: alunoNomeInput,
        sala: sala,
        professor_nome: `${profSelecionado.nome} - ${profSelecionado.materia}`,
        professor_email: profSelecionado.email,
        mensagem: mensagem,
      });
      setFeedbackMsg("✅ Dúvida enviada com sucesso!");
      setTimeout(() => fecharPopup(), 2000);
    } catch (err) {
      setFeedbackMsg("❌ Erro ao enviar. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <Header />

      {popupDuvida && profSelecionado && (
        <div className="ha-modal-overlay" onClick={fecharPopup}>
          <div className="ha-duvida-popup" onClick={(e) => e.stopPropagation()}>
            <div className="ha-duvida-header">
              <span>Enviar dúvida</span>
              <button className="ha-modal-close" onClick={fecharPopup}>✕</button>
            </div>
            <div className="ha-duvida-body">
              <p className="ha-duvida-para">
                Para: <strong>{profSelecionado.nome} — {profSelecionado.materia}</strong>
              </p>
              <input
                className="ha-duvida-input"
                type="text"
                placeholder="Seu nome"
                value={alunoNomeInput}
                onChange={(e) => setAlunoNomeInput(e.target.value)}
              />
              <input
                className="ha-duvida-input"
                type="text"
                placeholder="Sua sala"
                value={sala}
                onChange={(e) => setSala(e.target.value)}
              />
              <textarea
                className="ha-duvida-textarea"
                placeholder="Escreva sua dúvida aqui..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                rows={5}
              />
              {feedbackMsg && (
                <p className="ha-duvida-feedback">{feedbackMsg}</p>
              )}
              <button
                className="ha-duvida-btn-enviar"
                onClick={enviarDuvida}
                disabled={enviando}
              >
                {enviando ? "Enviando..." : "Enviar dúvida"}
              </button>
            </div>
          </div>
        </div>
      )}

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
        </section>

        <section className="ha-professores">
          <div className="ha-prof-header">
            <span className="ha-prof-label">
              <span>Fale com um professor</span>
            </span>
            <div className="ha-prof-logo">
              <img src={logo} alt="" className="ha-prof-logo-img" />
            </div>
          </div>
          <div className="ha-prof-lista">
            {professores.map((p) => (
              <div
                key={p.id}
                className={`ha-prof-card ${p.status === "disponivel" ? "ha-prof-card--clicavel" : ""}`}
                onClick={() => abrirPopup(p)}
              >
                <div className="ha-prof-card-left">
                  <img src={userIcon} className="ha-prof-icon" alt="" />
                  <span>{p.nome} - {p.materia}</span>
                </div>
                <span className={p.status === "disponivel" ? "ha-prof-status ha-prof-status--disp" : "ha-prof-status ha-prof-status--indisp"}>
                  {p.status === "disponivel" ? "Disponível" : "Indisponível"}
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