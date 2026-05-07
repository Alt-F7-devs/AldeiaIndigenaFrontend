import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginProfessor, loginAluno } from "../services/api";
import Header from "../components/Header";
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const [cpfProf, setCpfProf] = useState("");
  const [senhaProf, setSenhaProf] = useState("");

  const [cgmAluno, setCgmAluno] = useState("");
  const [senhaAluno, setSenhaAluno] = useState("");

  async function entrarProfessor() {
    if (cpfProf === "" || senhaProf === "") {
      alert("Preencha todos os campos!");
      return;
    }
    try {
      const data = await loginProfessor(cpfProf, senhaProf);
      localStorage.setItem("tipo", data.tipo);
      navigate("/professor");
    } catch (err) {
      alert("CPF ou senha inválidos!");
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
      navigate("/aluno");
    } catch (err) {
      alert("CGM ou senha inválidos!");
    }
  }

  return (
    <>
      <Header />

      <div className="container">
        <div className="left">
          <h2>Entrar como Professor</h2>
          <input
            type="text"
            placeholder="CPF"
            value={cpfProf}
            onChange={(e) => setCpfProf(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senhaProf}
            onChange={(e) => setSenhaProf(e.target.value)}
          />
          <a href="#" className="link-professor">Esqueci minha senha</a>
          <button className="btn-professor" onClick={entrarProfessor}>Entrar</button>
        </div>

        <div className="right">
          <h2>Entrar como Aluno</h2>
          <input
            type="text"
            placeholder="CGM"
            value={cgmAluno}
            onChange={(e) => setCgmAluno(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senhaAluno}
            onChange={(e) => setSenhaAluno(e.target.value)}
          />
          <a href="#" className="link-aluno">Esqueci minha senha</a>
          <button className="btn-aluno" onClick={entrarAluno}>Entrar</button>
        </div>
      </div>
    </>
  );
}

export default Login;