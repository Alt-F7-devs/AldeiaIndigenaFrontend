import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
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

const avisosMock = [
  { id: 1, titulo: "Bem-vindo", descricao: "Aviso 1", autor: "Prof. João", data: "19/06" },
  { id: 2, titulo: "Reunião", descricao: "Aviso 2", autor: "Coordenação", data: "19/06" },
  { id: 3, titulo: "Evento", descricao: "Aviso 3", autor: "Escola", data: "19/06" },
  { id: 4, titulo: "Extra", descricao: "Aviso 4", autor: "Sistema", data: "19/06" },
];

const TribalDivider = () => (
  <div className="ha-tribal">
    <img src={grafismo} alt="" className="ha-tribal-img" />
  </div>
);

export default function HomeAluno() {
  const navigate = useNavigate();

  const [avisos, setAvisos] = useState([]);
  const [index, setIndex] = useState(0);

  // CARREGA AVISOS DO LOCALSTORAGE
  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("avisos")) || [];
    console.log("AVISOS CARREGADOS:", dados);
    setAvisos(dados);
  }, []);

  // CONTROLE DO CARROSSEL
  const next = () => {
    if (index + 3 < avisos.length) {
      setIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  // AVISOS VISÍVEIS NO CARROSSEL
  const visible = avisos.slice(index, index + 3);


  return (
    <>
      <Header />

      <div className="ha-page">

        {/* ================= CURIOSIDADES ================= */}
        <section className="ha-curiosidades">
          <TribalDivider />

          <div className="ha-curio-label-wrap">
            <span className="ha-curio-label">Curiosidades</span>
          </div>

          <div className="ha-curio-body">
            <div className="ha-curio-cards">
              <div className="ha-curio-card ha-curio-card--esq" />
              <div className="ha-curio-card ha-curio-card--dir" />
            </div>

            <p className="ha-curio-texto">
              Texto sobre curiosidades do sistema educacional.
            </p>
          </div>

          <TribalDivider />
        </section>

        {/* ================= MENU ================= */}
        <section className="ha-menu">
          <button className="ha-menu-btn ha-menu-btn--salas" onClick={() => navigate("/sala-aluno")}>
            Minhas Salas
          </button>

          <button className="ha-menu-btn ha-menu-btn--conquistas" onClick={() => navigate("/conquistas")}>
            Minhas Conquistas
          </button>

          <TribalDivider />
        </section>

        {/* ================= PROFESSORES ================= */}
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
                  <img src={userIcon} className="ha-prof-icon" />
                  <span>{p.nome} - {p.materia}</span>
                </div>

                <span className={
                  p.status === "disponivel"
                    ? "ha-prof-status ha-prof-status--disp"
                    : "ha-prof-status ha-prof-status--indisp"
                }>
                  {p.status}
                </span>
              </div>
            ))}
          </div>

        </section>

        {/* ================= MURAL (IGUAL HOME PROFESSOR) ================= */}
         <section className="hp-mural-sec">

      <div className="hp-mural-outer">
        <div className="hp-mural-inner">

          <div className="hp-mural-titulo">
            Mural de avisos
          </div>

          <button className="hp-nav-btn hp-nav-left" onClick={prev}>
            ‹
          </button>

          <button className="hp-nav-btn hp-nav-right" onClick={next}>
            ›
          </button>

          {/* ✅ AQUI ESTÁ O CORRETO */}
          <div className="hp-mural-cards">
            {visible.map((aviso) => (
              <div key={aviso.id} className="hp-mural-card">

                <h3>{aviso.titulo}</h3>

                {aviso.imagem && (
                  <img
                    src={aviso.imagem}
                    alt="imagem do aviso"
                    className="hp-mural-img"
                  />
                )}

                <p>{aviso.descricao || aviso.texto}</p>

                <span>{aviso.autor || "Professor"}</span>

                <small>{aviso.data}</small>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  


      </div>

      <Footer />
    </>
  );
}