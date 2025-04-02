import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

export default function FormularioRestaurante() {
  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http
        .get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then((response) => setNomeRestaurante(response.data.nome))
        .catch((error) => console.error(error));
    }
  }, [parametros.id]);

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      http
        .put(`restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante atualizado com sucesso");
        })
        .catch((error) => console.error(error));
    } else {
      http
        .post("restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante cadastrado com sucesso");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Paper sx={{ padding: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography component="h1" variant="h6">
                Formulário de Restaurantes
              </Typography>
              <Box
                component="form"
                onSubmit={aoSubmeterForm}
                sx={{ width: "100%" }}
              >
                <TextField
                  value={nomeRestaurante}
                  onChange={(evento) => setNomeRestaurante(evento.target.value)}
                  label="Nome do Restaurante"
                  variant="standard"
                  fullWidth
                  required
                />
                <Button
                  sx={{ marginTop: 1 }}
                  type="submit"
                  variant="outlined"
                  fullWidth
                >
                  Salvar
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
