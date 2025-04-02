import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
  } from "@mui/material";
  
  import { useState } from "react";
  import { useParams } from "react-router-dom";
  
  import http from "../../../http";
  
  export default function FormularioPrato() {
    const [nomePrato, setNomePrato] = useState("");
  
    const parametros = useParams();
  
   
    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
      evento.preventDefault();
  
      if (parametros.id) {
        http
          .put(`pratos/${parametros.id}/`, {
            nome: nomePrato,
          })
          .then(() => {
            alert("Prato atualizado com sucesso");
          })
          .catch((error) => console.error(error));
      } else {
        http
          .post("pratos/", {
            nome: nomePrato,
          })
          .then(() => {
            alert("Prato cadastrado com sucesso");
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
                  Formulário de Pratos
                </Typography>
                <Box
                  component="form"
                  onSubmit={aoSubmeterForm}
                  sx={{ width: "100%" }}
                >
                  <TextField
                    value={nomePrato}
                    onChange={(evento) => setNomePrato(evento.target.value)}
                    label="Nome do Prato"
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
  