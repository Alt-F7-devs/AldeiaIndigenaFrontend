// ─── JOGOS ───────────────────────────────────────────────────────────────────

/* POST /jogos — Cria um novo jogo */
export async function criarJogo(data) {
  const csrfToken = await getCsrfToken();
  const res = await api.post("/jogos", data, {
    headers: { "X-XSRF-TOKEN": csrfToken }
  });
  return res.data;
}

/* GET /jogos — Lista todos os jogos */
export async function listarJogos() {
  const res = await api.get("/jogos");
  return res.data;
}

/* GET /jogos/:id — Busca jogo por ID */
export async function buscarJogoPorId(id) {
  const res = await api.get(`/jogos/${id}`);
  return res.data;
}

/* PUT /jogos/:id — Edita um jogo */
export async function editarJogo(id, data) {
  const csrfToken = await getCsrfToken();
  const res = await api.put(`/jogos/${id}`, data, {
    headers: { "X-XSRF-TOKEN": csrfToken }
  });
  return res.data;
}

/* DELETE /jogos/:id — Deleta um jogo */
export async function deletarJogo(id) {
  const csrfToken = await getCsrfToken();
  await api.delete(`/jogos/${id}`, {
    headers: { "X-XSRF-TOKEN": csrfToken }
  });
}

/* GET /jogos/resumo — Lista resumo de todos os jogos */
export async function listarJogosResumo() {
  const res = await api.get("/jogos/resumo");
  return res.data;
}

/* GET /jogos/resumo/sala/:idSala — Lista resumo de jogos por sala */
export async function listarJogosResumoPorSala(idSala) {
  const res = await api.get(`/jogos/resumo/sala/${idSala}`);
  return res.data;
}

// ─── PRESENÇAS ────────────────────────────────────────────────────────────────

/* POST /presencas/:cgm/jogo/:idJogo — Registra presença de um aluno */
export async function registrarPresenca(cgm, idJogo) {
  const csrfToken = await getCsrfToken();
  await api.post(`/presencas/${cgm}/jogo/${idJogo}`, {}, {
    headers: { "X-XSRF-TOKEN": csrfToken }
  });
}

/* GET /presencas/jogo/:idJogo — Lista alunos presentes em um jogo */
export async function listarPresencasJogo(idJogo) {
  const res = await api.get(`/presencas/jogo/${idJogo}`);
  return res.data;
}

/* DELETE /presencas/:cgm/jogo/:idJogo — Remove presença de um aluno */
export async function deletarPresenca(cgm, idJogo) {
  const csrfToken = await getCsrfToken();
  await api.delete(`/presencas/${cgm}/jogo/${idJogo}`, {
    headers: { "X-XSRF-TOKEN": csrfToken }
  });
}

// ─── AVISOS ───────────────────────────────────────────────────────────────────

const AVISOS_STORAGE_KEY = "avisos";

/* Retorna lista de avisos do localStorage */
export function listarAvisos() {
  return JSON.parse(localStorage.getItem(AVISOS_STORAGE_KEY)) || [];
}

/* Adiciona um aviso no localStorage */
export function adicionarAviso(aviso) {
  const avisos = listarAvisos();
  const novoAviso = { id: Date.now(), ...aviso };
  avisos.push(novoAviso);
  localStorage.setItem(AVISOS_STORAGE_KEY, JSON.stringify(avisos));
  return novoAviso;
}