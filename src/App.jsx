import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomeAluno from "./pages/HomeAluno";
import HomeProfessor from "./pages/HomeProfessor";
import BibliotecaJogos from "./pages/BibliotecaJogos";
import ConquistasAluno from "./pages/ConquistasAluno";
import GerenciaSala from "./pages/GerenciaSala";
import Historico from "./pages/HistoricoAtv";
import CriarEditarJogo from "./pages/CriarEditarJogo";
import ListaAluno from "./pages/ListaAluno";
import SalaAluno from "./pages/SalaAluno";
import SalaProfessor from "./pages/SalaProfessor";
import AdicionarAviso from "./pages/AdicionarAviso";
import RelatorioPresenca from "./pages/RelatorioPresenca";
import CadastroAdmin from "./pages/CadastroAdmin";
import CadastroAluno from "./pages/CadastroAluno";
import CadastroProfessor from "./pages/CadastroProfessor";
import SelecaoCadastro from "./pages/SelecaoCadastro";
import RotaProtegida from "./components/RotaProtegida";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Relatórios */}
        <Route path="/relatoriopresenca" element={<RotaProtegida tipo="ADMIN"><RelatorioPresenca /></RotaProtegida>} />

        {/* Cadastro */}
        <Route path="/cadastro" element={<RotaProtegida tipo="ADMIN"><SelecaoCadastro /></RotaProtegida>} />
        <Route path="/cadastro/admin" element={<RotaProtegida tipo="ADMIN"><CadastroAdmin /></RotaProtegida>} />
        <Route path="/cadastro/aluno" element={<RotaProtegida tipo="ADMIN"><CadastroAluno /></RotaProtegida>} />
        <Route path="/cadastro/professor" element={<RotaProtegida tipo="ADMIN"><CadastroProfessor /></RotaProtegida>} />

        {/* Aluno */}
        <Route path="/aluno" element={<RotaProtegida tipo="ALUNO"><HomeAluno /></RotaProtegida>} />
        <Route path="/jogos" element={<RotaProtegida tipo="ALUNO"><BibliotecaJogos /></RotaProtegida>} />
        <Route path="/conquistas" element={<RotaProtegida tipo="ALUNO"><ConquistasAluno /></RotaProtegida>} />
        <Route path="/sala-aluno" element={<RotaProtegida tipo="ALUNO"><SalaAluno /></RotaProtegida>} />

        {/* Professor */}
        <Route path="/professor" element={<RotaProtegida tipo="PROFESSOR"><HomeProfessor /></RotaProtegida>} />
        <Route path="/gerencia/:salaId" element={<RotaProtegida tipo="PROFESSOR"><GerenciaSala /></RotaProtegida>} />
        <Route path="/historico" element={<RotaProtegida tipo="PROFESSOR"><Historico /></RotaProtegida>} />
        <Route path="/criar-jogo" element={<RotaProtegida tipo="PROFESSOR"><CriarEditarJogo /></RotaProtegida>} />
        <Route path="/criar-jogo/:salaId" element={<RotaProtegida tipo="PROFESSOR"><CriarEditarJogo /></RotaProtegida>} />
        <Route path="/editar-jogo/:jogoId/:salaId" element={<RotaProtegida tipo="PROFESSOR"><CriarEditarJogo /></RotaProtegida>} />
        <Route path="/editar-jogo/:jogoId" element={<RotaProtegida tipo="PROFESSOR"><CriarEditarJogo /></RotaProtegida>} />
        <Route path="/lista-aluno/:salaId" element={<RotaProtegida tipo="PROFESSOR"><ListaAluno /></RotaProtegida>} />
        <Route path="/sala-professor" element={<RotaProtegida tipo="PROFESSOR"><SalaProfessor /></RotaProtegida>} />
        <Route path="/adicionar-aviso" element={<RotaProtegida tipo="PROFESSOR"><AdicionarAviso /></RotaProtegida>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;