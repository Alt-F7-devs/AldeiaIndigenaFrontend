import { BrowserRouter, Routes, Route } from "react-router-dom";
import RotaProtegida from "./components/RotaProtegida";
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
import UserProfile from "./pages/perfilprof";
import UserProfileAluno from "./pages/perfilAluno"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />

        {/* Rotas de Cadastro de usuários */}
        <Route path="/cadastro" element={<RotaProtegida tipo="ADMIN"><SelecaoCadastro /></RotaProtegida>} />
        <Route path="/cadastro/admin" element={<RotaProtegida tipo="ADMIN"><CadastroAdmin /></RotaProtegida>} />
        <Route path="/cadastro/aluno" element={<RotaProtegida tipo="ADMIN"><CadastroAluno /></RotaProtegida>} />
        <Route path="/cadastro/professor" element={<RotaProtegida tipo="ADMIN"><CadastroProfessor /></RotaProtegida>} />

        {/* Rotas do Aluno */}
	      <Route path="/perfilAluno" element={<RotaProtegida tipo="ALUNO"><UserProfileAluno /></RotaProtegida>} />
        <Route path="/aluno" element={<RotaProtegida tipo="ALUNO"><HomeAluno /></RotaProtegida>} />
        <Route path="/jogos" element={<RotaProtegida tipo="ALUNO"><BibliotecaJogos /></RotaProtegida>} />
        <Route path="/conquistas" element={<RotaProtegida tipo="ALUNO"><ConquistasAluno /></RotaProtegida>} />
        <Route path="/sala-aluno" element={<RotaProtegida tipo="ALUNO"><SalaAluno /></RotaProtegida>} />

        {/* Rotas do Professor */}
  	    <Route path="/perfil" element={<RotaProtegida tipo={["PROFESSOR", "ADMIN"]}><UserProfileProf /></RotaProtegida>} />
        <Route path="/professor" element={<RotaProtegida tipo={["PROFESSOR", "ADMIN"]}><HomeProfessor /></RotaProtegida>} />
        <Route path="/gerencia/:salaId" element={<RotaProtegida tipo={["PROFESSOR", "ADMIN"]}><GerenciaSala /></RotaProtegida>} />
        <Route path="/historico" element={<RotaProtegida tipo={["PROFESSOR", "ADMIN"]}><Historico /></RotaProtegida>} />
        <Route path="/criar-jogo" element={<RotaProtegida tipo={["PROFESSOR", "ADMIN"]}><CriarEditarJogo /></RotaProtegida>} />
        <Route path="/criar-jogo/:salaId" element={<RotaProtegida tipo={["PROFESSOR", "ADMIN"]}><CriarEditarJogo /></RotaProtegida>} />
        <Route path="/editar-jogo/:jogoId/:salaId" element={<RotaProtegida tipo={["PROFESSOR", "ADMIN"]}><CriarEditarJogo /></RotaProtegida>} />
        <Route path="/editar-jogo/:jogoId" element={<RotaProtegida tipo={["PROFESSOR", "ADMIN"]}><CriarEditarJogo /></RotaProtegida>} />
        <Route path="/lista-aluno/:salaId" element={<RotaProtegida tipo={["PROFESSOR", "ADMIN"]}><ListaAluno /></RotaProtegida>} />
        <Route path="/sala-professor" element={<RotaProtegida tipo={["PROFESSOR", "ADMIN"]}><SalaProfessor /></RotaProtegida>} />
        <Route path="/relatoriopresenca" element={<RotaProtegida tipo={["PROFESSOR", "ADMIN"]}><RelatorioPresenca /></RotaProtegida>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;