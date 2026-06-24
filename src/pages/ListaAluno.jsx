import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ListaAluno.css";
import Header from "../components/Header_aluno";
import Footer from "../components/Footer";
import { listarAlunosDaSala } from "../services/api";

function ListaAluno() {
  const { salaId } = useParams();
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarAlunos() {
      try {
        if (!salaId) {
          setErro("Sala não identificada. Volte e selecione uma sala.");
          setCarregando(false);
          return;
        }

        const data = await listarAlunosDaSala(salaId);
        setAlunos(Array.isArray(data) ? data : []);
      } catch (err) {
        const mensagem = err.response?.data?.message || "Erro ao carregar alunos";
        setErro(mensagem);
        console.error("Erro:", err);
      } finally {
        setCarregando(false);
      }
    }

    buscarAlunos();
  }, [salaId]);

  return (
    <>
      <Header />

      <div className="lista-page">
        <div className="lista-label">Lista de alunos</div>

        {carregando ? (
          <div className="lista-card">
            <p style={{ textAlign: "center", padding: "20px" }}>Carregando...</p>
          </div>
        ) : erro ? (
          <div className="lista-card">
            <p style={{ textAlign: "center", padding: "20px", color: "red" }}>Erro: {erro}</p>
          </div>
        ) : (
          <div className="lista-card">
            <div className="lista-header-row">
              <div className="lista-col lista-col--nome">Nome do aluno</div>
              <div className="lista-col lista-col--id">CGM</div>
            </div>

            <div className="lista-body">
              {alunos.length === 0 ? (
                <p style={{ textAlign: "center", padding: "20px" }}>Nenhum aluno nesta sala.</p>
              ) : (
                alunos.map((aluno, i) => (
                  <div key={aluno.id || i} className="lista-row">
                    <div className="lista-col lista-col--nome">{aluno.nome || "Sem nome"}</div>
                    <div className="lista-col lista-col--id">{aluno.id || aluno.cgm || "-"}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default ListaAluno;