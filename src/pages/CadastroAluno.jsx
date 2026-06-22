import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { criarAluno } from "../services/api";
import "./Cadastro.css";

function CadastroAluno() {
  const [nome, setNome] = useState("");
  const [cgm, setCgm] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState(null); // { tipo: "erro" | "sucesso", texto }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem(null);

    if (!nome.trim() || !cgm.trim() || !senha) {
      setMensagem({ tipo: "erro", texto: "Preencha nome, CGM e senha." });
      return;
    }
    if (senha !== confirmarSenha) {
      setMensagem({ tipo: "erro", texto: "As senhas não coincidem." });
      return;
    }
    
    // admin_login é uma FK para admin.id_admin (PK), então enviamos o ID do admin logado
    const adminId = localStorage.getItem("id_admin");
    if (!adminId) {
      setMensagem({ tipo: "erro", texto: "Sessão de administrador não encontrada. Faça login novamente." });
      return;
    }

    try {
      setCarregando(true);
      const data = await criarAluno({
        nome: nome.trim(),
        cgm: cgm.trim(),
        senha,
        admin_login: Number(adminId),
      });
      setMensagem({ tipo: "sucesso", texto: `Aluno "${data.nome}" cadastrado com sucesso!` });
      setNome("");
      setCgm("");
      setSenha("");
      setConfirmarSenha("");
    } catch (err) {
      const texto =
        err.response?.data?.message || err.response?.data || "Erro ao cadastrar aluno.";
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
            <h1 className="cad-card-title">Cadastro de Aluno</h1>
          </div>

          <div className="cad-card-body">
            <div className="cad-field">
              <label className="cad-label" htmlFor="aluno-nome">Nome</label>
              <input
                id="aluno-nome"
                className="cad-input"
                type="text"
                placeholder="Nome do aluno"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="cad-field">
              <label className="cad-label" htmlFor="aluno-cgm">CGM</label>
              <input
                id="aluno-cgm"
                className="cad-input"
                type="text"
                inputMode="numeric"
                maxLength={10}
                placeholder="CGM"
                value={cgm}
                onChange={(e) => setCgm(e.target.value.replace(/\D/g, "").slice(0, 10))}
                required
              />
            </div>

            <div className="cad-field">
              <label className="cad-label" htmlFor="aluno-senha">Senha</label>
              <input
                id="aluno-senha"
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
              <label className="cad-label" htmlFor="aluno-confirmar">Confirmar senha</label>
              <input
                id="aluno-confirmar"
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

export default CadastroAluno;
