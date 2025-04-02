import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
  } from "@mui/material";
  
  import { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  
  import http from "../../../http";
import ITag from "../../../interfaces/Itag";
import IRestaurante from "../../../interfaces/IRestaurante";
  
  export default function FormularioPrato() {
    const [nomePrato, setNomePrato] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tags, setTags] = useState<ITag[]>([]);
    const [tag, setTag] = useState("");
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    const [restaurante, setRestaurante] = useState("");
    const [imagem, setImagem] = useState<File | null>(null);

    const parametros = useParams();

    useEffect(() => {
      http.get<{tags: ITag[]}>('tags/')
      .then(resposta => {
        setTags(resposta.data.tags);
      })
      .catch(error => console.error(error));

      http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => {
        setRestaurantes(resposta.data);
      })
      .catch(error => console.error(error));
    }, []);
  
   
    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
      evento.preventDefault();
      
      const formData = new FormData();
      formData.append('nome', nomePrato);
      formData.append('descricao', descricao);
      formData.append('tag', tag);
      formData.append('restaurante', restaurante);

      if (imagem) {
        formData.append('imagem', imagem);
      }

      http.request({
        url: 'pratos/',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      })
      .then(() => {
        setNomePrato("");
        setDescricao("");
        setTag("");
        setRestaurante("");
        setImagem(null);
        alert("Prato cadastrado com sucesso");
      })
    };

    const aoUpload = (evento: React.ChangeEvent<HTMLInputElement>) => {
      if (evento.target.files?.length) {
        setImagem(evento.target.files[0]);
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
                  <TextField
                    value={descricao}
                    onChange={(evento) => setDescricao(evento.target.value)}
                    label="Descrição"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                  />
                  <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-tags">Tag</InputLabel>
                    <Select
                      labelId="select-tags"
                      value={tag}
                      onChange={(evento) => setTag(evento.target.value)}
                    >
                      {tags.map(tag => (
                        <MenuItem key={tag.id} value={tag.value}>{tag.value}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-restaurantes">Restaurante</InputLabel>
                    <Select
                      labelId="select-restaurantes"
                      value={restaurante}
                      onChange={(evento) => setRestaurante(evento.target.value)}
                    >
                      {restaurantes.map(restaurante => (
                        <MenuItem key={restaurante.id} value={restaurante.id}>{restaurante.nome}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={aoUpload}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                  </label>

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
  