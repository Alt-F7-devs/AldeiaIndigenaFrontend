import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AdicionarAviso.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AdicionarAviso() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [professor, setProfessor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [imagemPreview, setImagemPreview] = useState(null);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagemPreview(reader.result);
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
      <Header />

      <main className="ca-main">
        <form className="ca-card" onSubmit={handleSubmit}>
          <div className="ca-card-header">
            <span className="ca-card-title">Avisos</span>
          </div>

          <div className="ca-card-body">
            <div className="ca-col-left">
              <input
                className="ca-input"
                type="text"
                placeholder="Professor"
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}
              />

              <textarea
                className="ca-textarea"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />

              <input
                className="ca-input"
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />

              <button type="submit" className="ca-btn-publicar">
                Publicar
              </button>
            </div>

            <div className="ca-col-right">
              <div
                className="ca-image-frame"
                onClick={() => fileInputRef.current.click()}
              >
                {imagemPreview ? (
                  <img
                    src={imagemPreview}
                    alt="preview"
                    className="ca-image-preview"
                  />
                ) : (
                  <p className="ca-image-placeholder">
                    Clique para adicionar imagem
                  </p>
                )}
              </div>

              <button
                type="button"
                className="ca-btn-imagem"
                onClick={() => fileInputRef.current.click()}
              >
                Adicionar Imagem
              </button>

              <input
                ref={fileInputRef}
                type="file"
                className="ca-file-input"
                onChange={handleImagemChange}
                />
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}