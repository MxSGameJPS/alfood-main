import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdministracaoRestaurante from "./paginas/Administracao/Restaurantes/AdministracaoRestaurante";
import FormularioRestaurante from "./paginas/Administracao/Restaurantes/FormularioRestaurante";
import PaginaBaseAdmin from "./paginas/Administracao/PaginaBaseAdimin";
import AdministracaoPrato from "./paginas/Administracao/Prato/AdministracaoPratos";
import FormularioPrato from "./paginas/Administracao/Prato/FormularioPrato";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin" element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdministracaoRestaurante />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
        <Route path="pratos" element={<AdministracaoPrato />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />
        <Route path="pratos/:id" element={<FormularioPrato />} />
      </Route>
    </Routes>
  );
}

export default App;
