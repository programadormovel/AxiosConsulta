import estilo from "./Estilo";
import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import axios from "axios";

export default function App() {
  // Estado que receberá a listagem de filmes
  const [search, setSearch] = useState([]);
  const [filmes, setFilmes] = useState([]);

  // Criar a conexão do axios com o end-point
  const api = axios.create({
    baseURL: "https://www.omdbapi.com",
  });

  // Pesquisa de filmes
  const carregamento = async () => {
    // Realizar a consulta dos filmes
    await api
      .get("/?apikey=d8a44ab&type=movie&r=json&page=1&s=war")
      .then(function (response) {
        setSearch(response.data);
        console.log(search);
        setFilmes(search.Search);
        console.log(filmes);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Listagem = (props) => {
    return (
      <FlatList
        data={filmes}
        renderItem={({ item }) => (
          <View style={estilo.card}>
            <Image source={{ uri: item.Poster }} style={estilo.imagem} />
            <View style={estilo.cardInterno}>
              <Text style={estilo.itemTitle}>{item.Title}</Text>
              <Text style={estilo.item}>{item.Year}</Text>
              <Text style={estilo.item}>{item.Type}</Text>
              <Text style={estilo.item}>{item.imdbID}</Text>
            </View>
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={estilo.title}>Consulta de Filmes</Text>
      <TouchableOpacity style={estilo.botao}
        onPress={async () => {
          await carregamento();
        }}
      >
        <Text>BAIXAR LISTA DE FILMES</Text>
      </TouchableOpacity>

      <Listagem />
    </View>
  );
}
