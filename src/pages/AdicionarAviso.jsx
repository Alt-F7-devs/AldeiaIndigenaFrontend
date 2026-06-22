import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AdicionarAviso.css";
import logoImg from "../img/logo.svg";

export default function AdicionarAviso() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [professor, setProfessor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
const handleImagemChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    setImagemPreview(reader.result); // BASE64 (correto)
  };

  reader.readAsDataURL(file);
};
  const handleSubmit = (e) => {
    e.preventDefault();

    const novoAviso = {
      id: Date.now(),
      titulo: professor,
      descricao,
      data,
      imagem: imagemPreview,
    };

    const avisosSalvos =
      JSON.parse(localStorage.getItem("avisos")) || [];

    localStorage.setItem(
      "avisos",
      JSON.stringify([novoAviso, ...avisosSalvos])
    );

    alert("Aviso publicado com sucesso!");
    navigate("/professor");
  };

  return (
    <div className="ca-page">
      <header className="ca-header">
        <button
          className="ca-btn-icon"
          onClick={() => navigate("/")}
        >
          🏠
        </button>

        <div className="ca-logo">
          <img src={logoImg} alt="logo" />
        </div>

        <button
          className="ca-btn-sair"
          onClick={() => navigate("/login")}
        >
          Sair
        </button>
      </header>

      <main className="ca-main">
        <form className="ca-card" onSubmit={handleSubmit}>
          <h1>Avisos</h1>

          <input
            type="text"
            placeholder="Professor"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
          />

          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />

          <div
            onClick={() => fileInputRef.current.click()}
            style={{ cursor: "pointer" }}
          >
            {imagemPreview ? (
              <img
                src={imagemPreview}
                alt="preview"
                width="100%"
              />
            ) : (
              <p>Clique para adicionar imagem</p>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={handleImagemChange}
          />

          <button type="submit">
            Publicar
          </button>
        </form>
      </main>
    </div>
  );
}