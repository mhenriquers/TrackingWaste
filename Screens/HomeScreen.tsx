import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Type } from "../Types";

interface HomeProps {
  navigation: any;
  onOpenModal: () => void;
  expenses: Type[];
  totalGastoCredito: number;
  totalGastoDebito: number;
  valorTotal: number;
}

const HomeScreen: React.FC<HomeProps> = ({
  navigation,
  onOpenModal,
  totalGastoCredito,
  totalGastoDebito,
  valorTotal,
}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={require("./assets/logo.png")} style={styles.logo} />

        <TouchableOpacity
          onPress={() => navigation.navigate("Bills")}
          style={[styles.card, styles.subCard]}
        >
          <Text style={styles.subtitle}> Fixas: </Text>
          <Text style={styles.progressText}> 4/7 </Text>
          <Text style={styles.value}> R$ 0,00 </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ExpenseList")}
          style={[styles.card, styles.subCard]}
        >
          <Text style={styles.subtitle}> Cartão: </Text>
          <Text style={styles.value}> R$ {totalGastoCredito.toFixed(2)} </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ExpenseList")}
          style={[styles.card, styles.subCard]}
        >
          <Text style={styles.subtitle}> Débito </Text>
          <Text style={styles.value}> R$ {totalGastoDebito.toFixed(2)} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.subCard]}>
          <Text style={styles.subtitle}>Total:</Text>
          <Text style={styles.value}>R$ {valorTotal.toFixed(2)} </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onOpenModal} style={styles.triggercard}>
          <Text style={styles.triggertext}> + </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#faf7e7",
    paddingHorizontal: 20,
  },

  linkButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#333",
    borderRadius: 8,
  },

  linkButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  containerCards: {
    borderWidth: 1,
    borderColor: "#333",
    width: "90%",
  },

  logo: {
    width: 250,
    height: 250,
    top: 0,
  },

  card: {
    alignSelf: "flex-start",
    justifyContent: "center",
    width: "97%",
    borderRadius: 16,
    elevation: 15,
    shadowRadius: 5,
    padding: 10,
    shadowOffset: { width: 10, height: 0 },
    backgroundColor: "#fff",
    margin: 5,
  },

  subCard: {
    margin: 5,
    marginTop: 0,
    paddingVertical: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    position: "absolute",
    top: 50,
    fontSize: 34,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "flex-start",
  },

  progressText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 20,
  },

  subtitle: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
    alignItems: "flex-start",
    paddingLeft: 5,
  },

  value: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },

  triggercard: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#41d606",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    flex: 1,
  },

  triggertext: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
});

export default HomeScreen;
