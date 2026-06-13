import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { loginProfessor, loginAluno } from "../services/api";
import './Login.css';
import Footer from "../components/Footer";  

function Login() {
  const [cpfProf, setCpfProf] = useState("");
  const [senhaProf, setSenhaProf] = useState("");
  const [cgmAluno, setCgmAluno] = useState("");
  const [senhaAluno, setSenhaAluno] = useState("");
  const navigate = useNavigate();

  async function entrarProfessor() {
    if (cpfProf === "" || senhaProf === "") {
      alert("Preencha todos os campos!");
      return;
    }
    try {
      const data = await loginProfessor(cpfProf, senhaProf);
      localStorage.setItem("tipo", data.tipo);
      localStorage.setItem("id_professor", data.id); // ← Use 'data.id' agora
      navigate("/professor");
    } catch (err) {
      const mensagem = err.response?.data?.message || "Erro ao realizar login!";
      alert(mensagem);
    }
  }

  async function entrarAluno() {
    if (cgmAluno === "" || senhaAluno === "") {
      alert("Preencha todos os campos!");
      return;
    }
    try {
      const data = await loginAluno(cgmAluno, senhaAluno);
      localStorage.setItem("tipo", data.tipo);
      localStorage.setItem("cgm", cgmAluno);
      localStorage.setItem("id_aluno", data.id); // ← Adicione isso também
      navigate("/aluno");
    } catch (err) {
      const mensagem = err.response?.data?.message || "Erro ao realizar login!";
      alert(mensagem);
    }
  }

  return (
    <>
      <Header />

      <div className="wrapper">
        <div className="container">
          <div className="left">
            <h2>Entrar como Professor</h2>
            <input
              type="text"
              placeholder="Usuário"
              value={cpfProf}
              onChange={(e) => setCpfProf(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={senhaProf}
              onChange={(e) => setSenhaProf(e.target.value)}
            />
            <button className="btn-professor" onClick={entrarProfessor}>Entrar</button>
          </div>

          <div className="right">
            <h2>Entrar como Aluno</h2>
            <input
              type="text"
              placeholder="Usuário"
              value={cgmAluno}
              onChange={(e) => setCgmAluno(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={senhaAluno}
              onChange={(e) => setSenhaAluno(e.target.value)}
            />
            <button className="btn-aluno" onClick={entrarAluno}>Entrar</button>
          </div>
        </div>
      </div>
      <Footer />
      
    </>
  );
}

export default Login;