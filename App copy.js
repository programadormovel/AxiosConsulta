import estilo from "./Estilo";
import React, { useState, useEffect, useReducer } from "react";
import { Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import axios from "axios";

const initialState = {count: 1, lista: []};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

async function busca(search, action){
  console.log(action);
  if(action.type == 'carregamento'){
    search.lista = await carregamento({count: action.count});
    console.log(search);
    return {lista: search.lista}
  }
}

async function carregamento ({count}) {
  axios
  .get("https://www.omdbapi.com/?apikey=d8a44ab&type=movie&r=json&page=" + count + "&s=war")
  .then(function (response) {
    if (response.status == 200 || response.status == 201) {
      //setSearch(response.data);
      // search.lista = response.data;
      return response.data;
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

export default function App() {
  // Estado que receberá a listagem de filmes
  const [search, setSearch] = useReducer(busca, initialState);
  // const [filmes, setFilmes] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [totalPaginas, setTotalPaginas] = useState(0);

  // useEffect(() => {
  //   if (totalPaginas == 0) {
  //     // setContador(1);
  //     carregamento({ pagina: state.count });
  //     setTotalPaginas(Math.ceil(parseInt(search.totalResults) / 10));
  //   }
  // },[search]);

  // // Criar a conexão do axios com o end-point
  // const api = axios.create({
  //   baseURL: "https://www.omdbapi.com",
  // });

  // Pesquisa de filmes
  // const carregamento = (props) => {
  //   // Realizar a consulta dos filmes
  //   axios
  //     .get("https://www.omdbapi.com/?apikey=d8a44ab&type=movie&r=json&page=" + props.pagina + "&s=war")
  //     .then(function (response) {
  //       if (response.status == 200 || response.status == 201) {
  //         //setSearch(response.data);
  //         return response.data;
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

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

  const Listagem = (props) => {
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
        keyExtractor={(item) => item.Title}
      />
    );
  };

 

  return (
    <View style={styles.container}>
      <Text style={estilo.title}>Consulta de Filmes</Text>
      {search == null ? (
        <Text>filmes</Text>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>{search.totalResults}</Text>
          <Text>Total de Páginas: {totalPaginas} </Text>
          <View style={estilo.cardBotao}>
            <TouchableOpacity
              style={estilo.botao}
              onPress={() => {
                if (state.count > 1) dispatch({type: 'decrement'});
                //carregamento({ pagina: state.count });
                console.log(state.count);
                setSearch({type: 'carregamento', count: state.count});
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
                if (state.count < totalPaginas) dispatch({type: 'increment'});
                // carregamento({ pagina: state.count });
                console.log(state.count);
                setSearch({type: 'carregamento', count: state.count});
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
          // setContador(1);
          // carregamento({ pagina: state.count });
          console.log(state.count);
          setSearch({type: 'carregamento', count: state.count});
          setTotalPaginas(Math.ceil(parseInt(search.totalResults) / 10));
        }}
      >
        <Text>BAIXAR LISTA DE FILMES</Text>
      </TouchableOpacity>
      <Listagem />
    </View>
  );
}
