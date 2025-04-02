import { useEffect, useState } from "react";
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
import IPrato from "../../../interfaces/IPrato";

export default function AdministracaoPrato() {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http
      .get<IPrato[]>("pratos/")
      .then((response) => {
        setPratos(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const excluir = (prato: IPrato) => {
    http.delete(`pratos/${prato.id}/`)
      .then(() => {
        setPratos(pratos.filter(p => p.id !== prato.id));
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
              Descrição
            </TableCell>
            <TableCell>
              Tag
            </TableCell>
            <TableCell>
              Imagem
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
                  Cadastrar Prato
                </Button>                
              </Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
            <TableCell> {prato.nome} </TableCell>
            <TableCell> {prato.descricao} </TableCell>
            <TableCell> {prato.tag} </TableCell>
            <TableCell> [<a href={prato.imagem} target="_blank" rel="noreferrer">Ver imagem</a>] </TableCell>
            <TableCell>
              <Link to={`/admin/pratos/${prato.id}`}>
                Editar
              </Link>
            </TableCell>
            <TableCell>
              <Button onClick={() => excluir(prato)} variant="outlined" color="error">
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
