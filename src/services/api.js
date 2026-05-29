import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

async function getCsrfToken() {
  const res = await api.get("/csrf-token");
  return res.data.token;
}

export async function loginProfessor(cpf, senha) {
  const csrfToken = await getCsrfToken();
  const res = await api.post("/auth/login/professor", { cpf, senha }, {
    headers: { "X-XSRF-TOKEN": csrfToken }
  });
  return res.data;
}

export async function loginAluno(cgm, senha) {
  const csrfToken = await getCsrfToken();
  const res = await api.post("/auth/login/aluno", { cgm, senha }, {
    headers: { "X-XSRF-TOKEN": csrfToken }
  });
  return res.data;
}