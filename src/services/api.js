const BASE_URL = "http://localhost:8080";

export async function loginProfessor(cpf, senha) {
  const response = await fetch(`${BASE_URL}/auth/login/professor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cpf, senha }),
  });

  if (!response.ok) throw new Error("Credenciais inválidas");
  return response.json();
}

export async function loginAluno(cgm, senha) {
  const response = await fetch(`${BASE_URL}/auth/login/aluno`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cgm, senha }),
  });

  if (!response.ok) throw new Error("Credenciais inválidas");
  return response.json();
}