import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { InterfaceBill } from "./Types";
import Bills from "./Bills";

interface RenderCardProps {
  itemCard: InterfaceBill;
}
const RenderCard: React.FC<RenderCardProps> = ({ itemCard }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.billcontainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textBill}>{itemCard.nome}</Text>

            <Text style={styles.textBill}>
              {" "}
              R$ {itemCard.valor.toFixed(2)}{" "}
            </Text>
          </View>

          <Text style={styles.subTextBill}> Venc.: {itemCard.venc} </Text>
        </View>
        <View style={styles.checkMark}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 2,
  },

  card: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 10,
    minHeight: "11%",
    width: "90%",
    backgroundColor: "#fff",
    elevation: 10,
    flexDirection: "row",
  },

  billcontainer: {
    minHeight: "6%",
    width: "80%",
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#8dd5ff",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 5,
    marginBottom: 10,
  },

  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 5,
  },

  textBill: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10,
  },

  subTextBill: {
    marginBottom: 10,
    marginLeft: 10,
  },

  checkMark: {
    height: 30,
    width: 30,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "#333",
    backgroundColor: "#ffffff",
    marginVertical: 10,
    marginRight: 10,
    alignSelf: "center",
  },
});
export default RenderCard;
