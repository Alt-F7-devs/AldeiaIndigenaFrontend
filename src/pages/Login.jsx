import { useState } from "react";

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
    <div>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <br /><br />

      <button onClick={entrar}>Entrar</button>
    </div>
  );
}

export default Login;
