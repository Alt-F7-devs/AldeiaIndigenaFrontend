import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { criarAdmin } from "../services/api";
import "./Cadastro.css";

function CadastroAdmin() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState(null); // { tipo: "erro" | "sucesso", texto }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem(null);

    if (!login.trim() || !senha) {
      setMensagem({ tipo: "erro", texto: "Preencha login e senha." });
      return;
    }
    if (senha !== confirmarSenha) {
      setMensagem({ tipo: "erro", texto: "As senhas não coincidem." });
      return;
    }

    try {
      setCarregando(true);
      const data = await criarAdmin({ login: login.trim(), senha });
      setMensagem({ tipo: "sucesso", texto: `Administrador "${data.login}" cadastrado com sucesso!` });
      setLogin("");
      setSenha("");
      setConfirmarSenha("");
    } catch (err) {
      const texto =
        err.response?.data?.message || err.response?.data || "Erro ao cadastrar administrador.";
      setMensagem({ tipo: "erro", texto });
    } finally {
      setCarregando(false);
    }
  }

  return (
    <>
      <Header />

      <div className="cad-page">
        <form className="cad-card" onSubmit={handleSubmit} noValidate>
          <div className="cad-card-header">
            <h1 className="cad-card-title">Cadastro de Administrador</h1>
          </div>

          <div className="cad-card-body">
            <div className="cad-field">
              <label className="cad-label" htmlFor="admin-login">Login</label>
              <input
                id="admin-login"
                className="cad-input"
                type="text"
                placeholder="Login do administrador"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>

            <div className="cad-field">
              <label className="cad-label" htmlFor="admin-senha">Senha</label>
              <input
                id="admin-senha"
                className="cad-input"
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <span className="cad-hint">
                Mín. 6 caracteres, com pelo menos 1 letra, 1 número e 1 especial (!@#$%).
              </span>
            </div>

            <div className="cad-field">
              <label className="cad-label" htmlFor="admin-confirmar">Confirmar senha</label>
              <input
                id="admin-confirmar"
                className="cad-input"
                type="password"
                placeholder="Repita a senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
              />
            </div>

            {mensagem && (
              <p className={`cad-msg cad-msg--${mensagem.tipo}`}>{mensagem.texto}</p>
            )}

            <button type="submit" className="cad-btn" disabled={carregando}>
              {carregando ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default CadastroAdmin;
