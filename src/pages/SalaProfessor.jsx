import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SalaProfessor.css";
import Header from "../components/Header";
import { listarSalasPorProfessor, listarAlunosDaSala } from "../services/api";

function SalaProfessor() {
  const navigate = useNavigate();
  const [salas, setSalas] = useState([]);
  const [contagemAlunos, setContagemAlunos] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarSalas() {
      try {
        const idProfessor = localStorage.getItem("id_professor");
        
        if (!idProfessor) {
          setErro("Professor não autenticado. Faça login novamente.");
          setCarregando(false);
          return;
        }

        // Busca apenas as salas do professor logado (já vem ordenadas por ID)
        const dados = await listarSalasPorProfessor(idProfessor);
        setSalas(dados);

        // Busca a contagem de alunos para cada sala em paralelo
        const contagens = await Promise.all(
          dados.map(async (sala) => {
            try {
              const alunos = await listarAlunosDaSala(sala.id_sala);
              return [sala.id_sala, alunos.length];
            } catch {
              return [sala.id_sala, 0];
            }
          })
        );
        setContagemAlunos(Object.fromEntries(contagens));
      } catch {
        setErro("Não foi possível carregar as salas. Tente novamente.");
      } finally {
        setCarregando(false);
      }
    }

    buscarSalas();
  }, []);

  return (
    <>
      <Header />

      <div className="sala-container">
        <div className="sala-content">

          <div className="sala-titulo">
            <h2>Minhas Salas</h2>
          </div>

          {carregando && (
            <p style={{ textAlign: "center", padding: "20px", color: "#5e5e5e" }}>
              Carregando salas...
            </p>
          )}

          {erro && (
            <p style={{ textAlign: "center", padding: "20px", color: "#c0392b" }}>
              {erro}
            </p>
          )}

          {!carregando && !erro && salas.length === 0 && (
            <p style={{ textAlign: "center", padding: "20px", color: "#5e5e5e" }}>
              Nenhuma sala cadastrada.
            </p>
          )}

          {salas.map((sala) => (
            <div className="sala-card" key={sala.id_sala}>
              <div className="sala-info">
                <span className="tag-sala">Sala {sala.num_sa}</span>
                <span className="tag-alunos">
                  {contagemAlunos[sala.id_sala] ?? "..."} Aluno(s)
                </span>
                <span className="tag-materia">
                  {sala.jogosNomes && sala.jogosNomes.length > 0
                    ? sala.jogosNomes.join(", ")
                    : "Sem jogo vinculado"}
                </span>
              </div>

              <button
                className="sala-btn"
                onClick={() => navigate(`/gerencia/${sala.id_sala}`)}
              >
                Gerenciar Sala
              </button>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}

export default SalaProfessor;