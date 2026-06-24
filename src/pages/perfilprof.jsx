import { useState, useRef } from "react";
import "./Perfilprof.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header_professor";

export default function UserProfileProf() {
  const navigate = useNavigate();

  const [name, setName] = useState("João Duarte");
  const [email, setEmail] = useState("joao@email.com");
  const [password, setPassword] = useState("senha123");
  const [showPass, setShowPass] = useState(false);
  const [photoSrc, setPhotoSrc] = useState(null);
  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const fileRef = useRef();

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoSrc(ev.target.result);
    reader.readAsDataURL(file);
  }

  function showToast(msg) {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  }

  function saveProfile() {
    if (!name.trim()) { showToast("Informe seu nome."); return; }
    showToast("Perfil salvo com sucesso!");
  }

  function cancelEdit() {
    setName("João Duarte");
    setEmail("joao@email.com");
    setPassword("senha123");
    setShowPass(false);
    showToast("Alterações descartadas.");
  }

  return (
    <>
    <Header />
    <div className="up-page">
      <div className="up-card">

        {/* Avatar */}
        <div className="up-avatar-wrap">
          <div className="up-avatar-ring">
            <div className="up-avatar-inner">
              {photoSrc
                ? <img src={photoSrc} alt="Foto de perfil" />
                : <span>{initials}</span>}
            </div>
          </div>
          <button
            className="up-cam-btn"
            onClick={() => fileRef.current.click()}
            aria-label="Alterar foto"
          >
            📷
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePhoto}
          />
        </div>

        <span className="up-badge">● Ativo</span>

        <div className="up-divider" />

        {/* Campos */}
        <div className="up-fields">
          <div className="up-field-group">
            <label className="up-label">Nome completo</label>
            <div className="up-field-row">
              <span className="up-icon">👤</span>
              <input
                className="up-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
              />
            </div>
          </div>

          <div className="up-field-group">
            <label className="up-label">E-mail</label>
            <div className="up-field-row">
              <span className="up-icon">✉</span>
              <input
                className="up-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail"
              />
            </div>
          </div>

          <div className="up-field-group">
            <label className="up-label">Senha</label>
            <div className="up-field-row">
              <span className="up-icon">🔒</span>
              <input
                className="up-input"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
              />
              <button
                className="up-eye-btn"
                onClick={() => setShowPass(!showPass)}
                aria-label="Mostrar ou ocultar senha"
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </div>
        </div>

        <div className="up-divider" />

        {/* Ações */}
        <div className="up-actions">
          <button className="up-btn-cancel" onClick={cancelEdit}>
            Cancelar
          </button>
          <button className="up-btn-save" onClick={saveProfile}>
            Salvar alterações
          </button>
        </div>
      </div>

      {/* Toast */}
      <div className={`up-toast ${toastVisible ? "up-toast--show" : ""}`}>
        {toast}
      </div>
    </div>
  </>
  );
}