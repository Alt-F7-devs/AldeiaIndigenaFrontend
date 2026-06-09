import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true
});

async function getCsrfToken() {
  const res = await api.get("/csrf-token");
  return res.data.token;
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────

/* POST /auth/login/professor — Login como professor */
export async function loginProfessor(cpf, senha) {
  const csrfToken = await getCsrfToken();
  const res = await api.post("/auth/login/professor", { cpf, senha }, {
    headers: { "X-XSRF-TOKEN": csrfToken }
  });
  return res.data;
}

/* POST /auth/login/aluno — Login como aluno */
export async function loginAluno(cgm, senha) {
  const csrfToken = await getCsrfToken();
  const res = await api.post("/auth/login/aluno", { cgm, senha }, {
    headers: { "X-XSRF-TOKEN": csrfToken }
  });
  return res.data;
}

// ─── ALUNO ────────────────────────────────────────────────────────────────────

/* GET /aluno — Lista todos os alunos */
export async function listarAluno() {
  const res = await api.get("/aluno");
  return res.data;
}

// ─── SALA ────────────────────────────────────────────────────────────────────

/* POST /sala — Cria uma nova sala */
export async function criarSala(data) {
  const csrfToken = await getCsrfToken();
  const res = await api.post("/sala", data, {
    headers: { "X-XSRF-TOKEN": csrfToken }
  });
  return res.data;
}

/* GET /sala — Lista todas as salas */
export async function listarSalas() {
  const res = await api.get("/sala");
  return res.data;
}

/* GET /sala/:id — Busca sala por ID */
export async function buscarSalaPorId(id_sala) {
  const res = await api.get(`/sala/${id_sala}`);
  return res.data;
}

/* PATCH /sala/:id — Edita parcialmente uma sala */
export async function editarSala(id_sala, data) {
  const csrfToken = await getCsrfToken();
  const res = await api.patch(`/sala/${id_sala}`, data, {
    headers: { "X-XSRF-TOKEN": csrfToken }
  });
  return res.data;
}

/* DELETE /sala/:id — Deleta uma sala */
export async function deletarSala(id_sala) {
  const csrfToken = await getCsrfToken();
  await api.delete(`/sala/${id_sala}`, {
    headers: { "X-XSRF-TOKEN": csrfToken }
  });
}

/* DELETE /sala/:id/professor — Desvincula professor de uma sala */
export async function desvincularProfessorSala(id_sala) {
  const csrfToken = await getCsrfToken();
  const res = await api.delete(`/sala/${id_sala}/professor`, {
    headers: { "X-XSRF-TOKEN": csrfToken }
  });
  return res.data;
}

// ─── ALUNOS NA SALA ───────────────────────────────────────────────────────────

/* POST /sala/:id_sala/aluno/:id_aluno — Adiciona aluno a uma sala */
export async function adicionarAlunoSala(id_sala, id_aluno) {
  const csrfToken = await getCsrfToken();
  const res = await api.post(`/sala/${id_sala}/aluno/${id_aluno}`, {}, {
    headers: { "X-XSRF-TOKEN": csrfToken }
  });
  return res.data;
}

/* GET /sala/:id_sala/alunos — Lista alunos de uma sala (visão do professor) */
export async function listarAlunosDaSala(id_sala) {
  const res = await api.get(`/sala/${id_sala}/alunos`);
  return res.data;
}

/* GET /sala/aluno/:id_aluno — Lista salas de um aluno pelo ID do aluno (visão do aluno logado) */
export async function listarAlunosSala(id_aluno) {
  const res = await api.get(`/sala/aluno/${id_aluno}`);
  return res.data;
}

/* GET /sala/aluno/:id_aluno — Alias mantido para compatibilidade */
export async function listarAlunosPorId(id_aluno) {
  const res = await api.get(`/sala/aluno/${id_aluno}`);
  return res.data;
}

// ─── JOGOS NA SALA ────────────────────────────────────────────────────────────

/* POST /sala/:id_sala/jogos/:id_jogo — Adiciona jogo a uma sala */
export async function adicionarJogoSala(id_sala, id_jogo) {
  const csrfToken = await getCsrfToken();
  const res = await api.post(`/sala/${id_sala}/jogos/${id_jogo}`, {}, {
    headers: { "X-XSRF-TOKEN": csrfToken }
  });
  return res.data;
}

/* GET /sala/jogos — Lista todos os jogos vinculados a salas */
export async function listarJogosSala() {
  const res = await api.get("/sala/jogos");
  return res.data;
}

/* GET /sala/jogos/:id — Busca jogo de sala por ID */
export async function buscarJogoPorIdSala(id) {
  const res = await api.get(`/sala/jogos/${id}`);
  return res.data;
}