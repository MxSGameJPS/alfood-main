import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Link } from "react-router-dom";
import http from "../../../http";

export default function AdministracaoRestaurante() {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((response) => {
        setRestaurantes(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const excluir = (restaurante: IRestaurante) => {
    http.delete(`restaurantes/${restaurante.id}/`)
      .then(() => {
        setRestaurantes(restaurantes.filter(r => r.id !== restaurante.id));
      })
      .catch((error) => console.error(error));
  };
  

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>              
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
            <TableCell>
              <Link to="/admin/restaurantes/novo">              
                <Button  variant="contained" color="primary">       
                  Cadastrar Restaurante
                </Button>                
              </Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow key={restaurante.id}>
            <TableCell> {restaurante.nome} </TableCell>
            <TableCell>
              <Link to={`/admin/restaurantes/${restaurante.id}`}>
                Editar
              </Link>
            </TableCell>
            <TableCell>
              <Button onClick={() => excluir(restaurante)} variant="outlined" color="error">
                Excluir
              </Button>
            </TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
