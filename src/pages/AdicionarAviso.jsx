import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AdicionarAviso.css";
import logoImg from "../img/logo.svg";

const TribalBorder = () => (
  <div style={{
    width: "100%",
    height: "60px",
    backgroundImage: "url('/src/img/grafismo.svg')",
    backgroundSize: "auto 100%",
    backgroundRepeat: "repeat-x",
    backgroundPosition: "center"
  }} aria-hidden="true" />
);

export default function AdicionarAviso() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [professor, setProfessor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [imagemPreview, setImagemPreview] = useState(null);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagemPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ professor, descricao, data, imagemPreview });
  };

  return (
    <div className="ca-page">
      <header className="ca-header">
        <button className="ca-btn-icon" onClick={() => navigate("/")} aria-label="Ir para início">
          <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </button>

        <div style={{ position: "absolute", left: "50%", top: "100%", transform: "translate(-50%, -50%)", zIndex: 20 }}>
          <div style={{ width: "110px", height: "110px", borderRadius: "50%", backgroundColor: "#F0D9A0", border: "5px solid #6BAA28", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={logoImg} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        <div className="ca-header-right">
          <button className="ca-btn-sair" onClick={() => navigate("/login")}>Sair</button>
          <button className="ca-btn-icon" aria-label="Perfil do usuário">
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </button>
        </div>
      </header>

      <TribalBorder />

      <main className="ca-main">
        <form className="ca-card" onSubmit={handleSubmit} noValidate>
          <div className="ca-card-header">
            <h1 className="ca-card-title">Avisos</h1>
          </div>

          <div className="ca-card-body">
            <div className="ca-col-left">
              <input className="ca-input" type="text" placeholder="Professor:" value={professor} onChange={(e) => setProfessor(e.target.value)} required />
              <textarea className="ca-textarea" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
              <input className="ca-input" type="date" value={data} onChange={(e) => setData(e.target.value)} required />
              <button type="submit" className="ca-btn-publicar">Publicar Aviso</button>
            </div>

            <div className="ca-col-right">
              <div className="ca-image-frame" onClick={() => fileInputRef.current.click()} role="button" tabIndex={0} aria-label="Clique para adicionar imagem" onKeyDown={(e) => e.key === "Enter" && fileInputRef.current.click()}>
                {imagemPreview ? (
                  <img src={imagemPreview} alt="Preview" className="ca-image-preview" />
                ) : (
                  <div className="ca-image-placeholder">
                    <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
                      <rect x="4" y="10" width="40" height="30" rx="4" stroke="#6BAA28" strokeWidth="2.5" />
                      <circle cx="16" cy="20" r="4" stroke="#6BAA28" strokeWidth="2" />
                      <path d="M4 34l10-8 8 6 8-10 14 12" stroke="#6BAA28" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>

              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImagemChange} className="ca-file-input" aria-hidden="true" />
              <button type="button" className="ca-btn-imagem" onClick={() => fileInputRef.current.click()}>Adicionar Imagem</button>
            </div>
          </div>
        </form>
      </main>

      <div className="ca-footer-tribal">
        <TribalBorder />
      </div>
    </div>
  );
}