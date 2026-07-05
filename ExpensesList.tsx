import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Expense } from "./Types";

interface ExpenseProps {
  expenseList: Expense[];
}
export const ExpenseList: React.FC<ExpenseProps> = ({ expenseList }) => {
  return (
    <FlatList
      data={expenseList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.expenseCard}>
          <Text style={styles.expenseName}> {item.name}</Text>
          <Text style={styles.expenseValue}> {item.amount.toFixed(2)}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  expenseCard: {},

  expenseName: {},

  expenseValue: {},
});

export default ExpenseProps;
