import { StyleSheet } from "react-native";
import { HORIZONTAL } from "react-native/Libraries/Components/ScrollView/ScrollViewContext";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: "#BADB5E",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    padding: 5,
    fontSize: 20,
    height: 44,
    fontWeight: "bold"
  },
  itemTitle: {
    padding: 5,
    fontSize: 20,
    height: 60,
    width: "100%",
  },
  item: {
    fontSize: 18,
    height: 34,
  },
  imagem: {
    width: 100,
    height: 150,
    margin: 8,
    borderRadius: 8,
  },
  card: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    borderColor: "#8858E8",
    borderStyle: "solid",
    borderRadius: 16,
    borderWidth: 2,
    margin: 4,
    elevation: 4,
    backgroundColor: "#EBB8E5",
  },

  cardInterno: {
    minWidth: "60%",
    maxWidth: "60%",
    maxHeight: "100%",
    alignSelf: "stretch",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  botao: {
    fontSize: 18,
    fontWeight: "900",
    fontFamily: "Consolas",
    borderRadius: 8,
    margin: 4,
    elevation: 4,
    backgroundColor: "#EBB8E5",
    padding: 4,
  },

  cardBotao: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    borderColor: "#8858E8",
    borderStyle: "solid",
    borderRadius: 16,
    borderWidth: 2,
    margin: 4,
    elevation: 4,
    backgroundColor: "#EBB8E5",
    maxHeight: 72,
  },
});
