import { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import axios, { AxiosRequestConfig } from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";
import { Button, Input } from "@mui/material";


interface IParametrosBusca {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {
 const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
 const [proximaPagina, setProximaPagina] = useState<string>("");
 const [paginaAnterior, setPaginaAnterior] = useState<string>("");

  const [busca, setBusca] = useState<string>("");

  const carregandoDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(resposta => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
   
    const opcoes = {
      params: {

      } as IParametrosBusca
    }
    if (busca) {
      opcoes.params.search = busca;
    }
    carregandoDados("http://localhost:8000/api/v1/restaurantes/", opcoes);
  }


  useEffect(() => {
    carregandoDados("http://localhost:8000/api/v1/restaurantes/");
  }, []); 

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <form onSubmit={buscar}>
        <Input type="text" value={busca} onChange={evento => setBusca(evento.target.value)} />
        <Button type="submit">Buscar</Button>
      </form>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {<Button onClick={() => carregandoDados(paginaAnterior)} disabled={!paginaAnterior}>
      Página Anterior
    </Button>}
      {<Button onClick={() => carregandoDados(proximaPagina)} disabled={!proximaPagina}>
      Próxima página
    </Button>}
    </section>
  );
};

export default ListaRestaurantes;
