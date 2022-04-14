import estilo from "./Estilo";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
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

  // const config = {
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "POST, GET",
  //     "Access-Control-Allow-Headers": "*",
  //     "Access-Control-Max-Age": "86400",
  //   },
  // };

  // api.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  // api.defaults.headers.post["Access-Control-Allow-Methods"] = "POST, GET";
  // api.defaults.headers.post["Access-Control-Allow-Headers"] =
  //   "OPTIONS,Accept,Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Header";
  // api.defaults.headers.post["Access-Control-Max-Age"] = "86400";

  // useEffect(() => {
  //   carregamento();
  // });

  // Pesquisa de filmes
  const carregamento = async () => {
    // Realizar a consulta dos filmes
    await api
      .get("/?apikey=d8a44ab&type=movie&r=json&page=1&s=war")
      .then(function (response) {
        setSearch(response.data);
        console.log(search);
        setFilmes(JSON.stringify(search.Search));
        console.log(filmes);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Listagem = (_) => {
    return (
      <View>
        {filmes != null ? (
          filmes.map((element) => {
            <Text>{element}</Text>;
          })
        ) : (
          <Text>Lista não carregada</Text>
        )}
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Consulta de Filmes</Text>

        <Listagem />

        <TouchableOpacity onPress={carregamento}>
          <Text>CARREGAMENTO</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
