import "./ListaAluno.css";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { listarAlunosDaSala } from "../services/api";

function ListaAluno() {
  const { salaId } = useParams(); // Usar o parâmetro correto
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (salaId) {
      buscarAlunos();
    }
  }, [salaId]);

  const buscarAlunos = async () => {
  try {
    setCarregando(true);
    setErro(null);
    
    const dados = await listarAlunosDaSala(salaId);
    console.log("Estrutura do aluno:", dados[0]); // Ver o primeiro aluno
    setAlunos(Array.isArray(dados) ? dados : []);
    
  } catch (erro) {
    console.error("Erro:", erro);
    setErro(`Erro: ${erro.response?.status || erro.message}`);
  } finally {
    setCarregando(false);
  }
};

  return (
    <>
      <Header />
      <div className="lista-page">
        <div className="lista-label">Lista de alunos - Sala {salaId}</div>

        <div className="lista-card">
          <div className="lista-header-row">
            <div className="lista-col lista-col--nome">Nome do aluno</div>
            <div className="lista-col lista-col--cgm">CGM</div>
          </div>

          <div className="lista-body">
            {carregando && <p className="lista-loading">⏳ Carregando alunos...</p>}
            
            {erro && <p className="lista-erro">❌ {erro}</p>}
            
            {!carregando && alunos.length === 0 && !erro && (
              <p className="lista-vazio">📭 Nenhum aluno encontrado</p>
            )}
            
            {alunos.map((aluno) => (
              <div key={aluno.id} className="lista-row">
                <div className="lista-col lista-col--nome">{aluno.nome}</div>
                <div className="lista-col lista-col--cgm">{aluno.cgm}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaAluno;