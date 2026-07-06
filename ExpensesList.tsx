import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Type } from "./Types";

interface ExpenseProps {
  expenseList: Type[];
}
const ExpenseList: React.FC<ExpenseProps> = ({ expenseList }) => {
  return (
    <FlatList
      data={expenseList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.expenseCard}>
          <View style={styles.cardSuperior}>
            <Text style={styles.expenseSuperior}> {item.title}</Text>
            <Text style={styles.expenseSuperior}>
              {" "}
              R$ {item.amount.toFixed(2)}
            </Text>
          </View>
          <Text style={styles.expenseInferior}>
            {" "}
            {item.createdAt.toLocaleString("pt-BR")}
          </Text>
          <Text style={styles.expenseInferior}> Obs:{item.observacao} </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  expenseCard: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: "#FFF",
  },

  cardSuperior: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  expenseSuperior: {
    fontWeight: "bold",
    fontSize: 26,
  },

  expenseInferior: {
    fontSize: 16,
    marginTop: 2,
  },
});

export default ExpenseList;
