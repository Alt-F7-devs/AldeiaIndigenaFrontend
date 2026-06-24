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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Cadastro */}
        <Route path="/cadastro" element={<SelecaoCadastro />} />
        <Route path="/cadastro/admin" element={<CadastroAdmin />} />
        <Route path="/cadastro/aluno" element={<CadastroAluno />} />
        <Route path="/cadastro/professor" element={<CadastroProfessor />} />

        {/* Aluno */}
        <Route path="/aluno" element={<HomeAluno />} />
        <Route path="/jogos" element={<BibliotecaJogos />} />
        <Route path="/conquistas" element={<ConquistasAluno />} />
        <Route path="/sala-aluno" element={<SalaAluno />} />

        {/* Professor */}
        <Route path="/professor" element={<HomeProfessor />} />
        <Route path="/gerencia/:salaId" element={<GerenciaSala />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/criar-jogo" element={<CriarEditarJogo />} />
        <Route path="/criar-jogo/:salaId" element={<CriarEditarJogo />} />
        <Route path="/editar-jogo/:jogoId/:salaId" element={<CriarEditarJogo />} />
        <Route path="/editar-jogo/:jogoId" element={<CriarEditarJogo />} />
        <Route path="/lista-aluno/:salaId" element={<ListaAluno />} />
        <Route path="/sala-professor" element={<SalaProfessor />} />
        <Route path="/relatoriopresenca" element={<RelatorioPresenca />} />
        <Route path="/adicionar-aviso" element={<AdicionarAviso />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;