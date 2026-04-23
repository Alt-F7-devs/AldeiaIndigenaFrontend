import { useState } from "react";
import Header from "../components/Header";  // ← ADICIONE ESTA LINHA

function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  function entrar() {
    if (usuario === "" || senha === "") {
      alert("Preencha todos os campos!");
      return;
    }
    alert("Login realizado!");
  }

  return (
    <>
      <Header /> 
      
      <div className="container">
        <div className="left">
          <h2>Entrar como Professor</h2>
          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button onClick={entrar}>Entrar</button>
        </div>

        <div className="right">
          <h2>Entrar como Aluno</h2>
          <input type="text" placeholder="Usuário" />
          <input type="password" placeholder="Senha" />
          <button>Entrar</button>
        </div>
      </div>
    </>
  );
}

export default Login;