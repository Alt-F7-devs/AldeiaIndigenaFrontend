import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

export async function loginProfessor(cpf, senha) {
  const res = await api.post("/auth/login/professor", { cpf, senha });
  return res.data;
}

export async function loginAluno(cgm, senha) {
  const res = await api.post("/auth/login/aluno", { cgm, senha });
  return res.data;
}