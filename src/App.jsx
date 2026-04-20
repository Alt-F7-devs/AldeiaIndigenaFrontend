import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomeAluno from "./pages/HomeAluno";
import HomeProfessor from "./pages/HomeProfessor";
import BlibliotecaJogos from "./pages/BlibliotecaJogos";
import ConquistasAluno from "./pages/ConquistasAluno";
import GerenciaSala from "./pages/GerenciaSala";
import Historico from "./pages/HistoricoAtv";  
import ListaAluno from "./pages/ListaAluno";
import SalaAluno from "./pages/SalaAluno";
import SalaProfessor from "./pages/SalaProfessor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/aluno" element={<HomeAluno />} />
        <Route path="/professor" element={<HomeProfessor />} />
        <Route path="/jogos" element={<BlibliotecaJogos />} />
        <Route path="/conquistas" element={<ConquistasAluno />} />
        <Route path="/gerencia" element={<GerenciaSala />} />
        <Route path="/historico" element={<Historico />} /> 
        <Route path="/lista-aluno" element={<ListaAluno />} />
        <Route path="/sala-aluno" element={<SalaAluno />} />
        <Route path="/sala-professor" element={<SalaProfessor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;