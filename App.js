import estilo from "./Estilo";
import React, { useState, useEffect, useReducer } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";

const initialState = { count: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 1 };
    case "final":
      return { count: action.totalPaginas };
    default:
      throw new Error();
  }
}

export default function App() {
  // Estado que receberá a listagem de filmes
  const [search, setSearch] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const Item = ({ poster, title, year, type, imdbID }) => (
    <View style={estilo.card}>
      <Image source={{ uri: poster }} style={estilo.imagem} />
      <View style={estilo.cardInterno}>
        <Text style={estilo.itemTitle}>{title}</Text>
        <Text style={estilo.item}>{year}</Text>
        <Text style={estilo.item}>{type}</Text>
        <Text style={estilo.item}>{imdbID}</Text>
      </View>
    </View>
  );

  const Listagem = () => {
    const renderItem = ({ item }) => (
      <Item
        poster={item.Poster}
        title={item.Title}
        year={item.Year}
        type={item.Type}
        imdbID={item.imdbID}
      />
    );
    return (
      <FlatList
        data={search.Search}
        renderItem={renderItem}
        keyExtractor={(item) => item.imdbID}
        refreshing={true}
        keyboardDismissMode="on-drag"
      />
    );
  };

  useEffect(() => {
    // Criar a conexão do axios com o end-point
    const api = axios.create({
      baseURL: "https://www.omdbapi.com",
    });

    // Pesquisa de filmes
    const carregamento = (_) => {
      // Realizar a consulta dos filmes
      api
        .get(
          "https://www.omdbapi.com/?apikey=d8a44ab&type=movie&r=json&page=" +
            state.count +
            "&s=love"
        )
        .then(function (response) {
          if (response.status == 200 || response.status == 201) {
            setSearch(response.data);
            setTotalPaginas(Math.ceil(parseInt(search.totalResults) / 10));
            return response.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    carregamento();
  }, [state, search]);

  return (
    <View style={styles.container}>
      <Text style={estilo.title}>Consulta de Filmes</Text>
      {search == null ? (
        <Text>filmes</Text>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>{search.totalResults} filmes</Text>
          <Text>Total de Páginas: {totalPaginas} </Text>
          <View style={estilo.cardBotao}>
            <TouchableOpacity
              style={estilo.botao}
              onPress={() => {
                if (state.count > 1) dispatch({ type: "decrement" });
                console.log(state.count);
              }}
            >
              <Image
                source={require("./assets/esquerda.png")}
                style={{ width: 48, height: 48 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={estilo.botao}
              onPress={() => {
                if (state.count < totalPaginas) dispatch({ type: "increment" });
                console.log(state.count);
              }}
            >
              <Image
                source={require("./assets/direita.png")}
                style={{ width: 48, height: 48 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Text>Página: {state.count}</Text>
      <TouchableOpacity
        style={estilo.botao}
        onPress={() => {
          dispatch({ type: "reset" });
          console.log(state.count);
        }}
      >
        <Text>IR PARA A PÁGINA 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={estilo.botao}
        onPress={() => {
          dispatch({ type: "final", totalPaginas });
          console.log(state.count);
        }}
      >
        <Text>IR PARA A ÚLTIMA PÁGINA</Text>
      </TouchableOpacity>

      <ScrollView style={estilo.listagem} nestedScrollEnabled={true}>
        <View>
          <ScrollView horizontal={true}>
            <Listagem />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
