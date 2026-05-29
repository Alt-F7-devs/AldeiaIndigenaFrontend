import { BrowserRouter, Routes, Route } from "react-router-dom";
import RotaProtegida from "./components/RotaProtegida";
import Login from "./pages/Login";
import HomeAluno from "./pages/HomeAluno";
import HomeProfessor from "./pages/HomeProfessor";
import BibliotecaJogos from "./pages/BibliotecaJogos";
import ConquistasAluno from "./pages/ConquistasAluno";
import GerenciaSala from "./pages/GerenciaSala";
import Historico from "./pages/HistoricoAtv";
import ListaAluno from "./pages/ListaAluno";
import SalaAluno from "./pages/SalaAluno";
import SalaProfessor from "./pages/SalaProfessor";
import RelatorioPresenca from "./pages/RelatorioPresenca";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Rotas do Aluno */}
        <Route path="/aluno" element={<RotaProtegida tipo="ALUNO"><HomeAluno /></RotaProtegida>} />
        <Route path="/jogos" element={<RotaProtegida tipo="ALUNO"><BibliotecaJogos /></RotaProtegida>} />
        <Route path="/" element={<RotaProtegida tipo="ALUNO"><ConquistasAluno /></RotaProtegida>} />
        <Route path="/sala-aluno" element={<RotaProtegida tipo="ALUNO"><SalaAluno /></RotaProtegida>} />

        {/* Rotas do Professor */}
        <Route path="/professor" element={<RotaProtegida tipo="PROFESSOR"><HomeProfessor /></RotaProtegida>} />
        <Route path="/gerencia/:salaId" element={<RotaProtegida tipo="PROFESSOR"><GerenciaSala /></RotaProtegida>} />
        <Route path="/historico" element={<RotaProtegida tipo="PROFESSOR"><Historico /></RotaProtegida>} />
        <Route path="/lista-aluno" element={<RotaProtegida tipo="PROFESSOR"><ListaAluno /></RotaProtegida>} />
        <Route path="/sala-professor" element={<RotaProtegida tipo="PROFESSOR"><SalaProfessor /></RotaProtegida>} />
        <Route path="/relatoriopresenca" element={<RotaProtegida tipo="PROFESSOR"><RelatorioPresenca /></RotaProtegida>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;