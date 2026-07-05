import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ModalScreen } from "./ModalScreen";
import { Expense, RootStackParamList } from "./Types";
import { ExpenseList } from "./ExpensesList";

interface AppProps {}

const Stack = createNativeStackNavigator<RootStackParamList>();
type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

const App: React.FC<AppProps> = () => {
  // 🟢 Corrigido o "s" minúsculo em setCurrentScreen para seguir o padrão do React
  const [currentScreen, setCurrentScreen] = useState<"home" | "list">("home");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleSaveExpense = (newExpenseData: any) => {
    const completeExpense: Expense = {
      ...newExpenseData,
      id: Math.random().toString(),
      createdAt: new Date(),
    };
    setExpenses((currentExpenses) => [...currentExpenses, completeExpense]);

    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {currentScreen === "home" ? (
        <View style={styles.container}>
          <Image source={require("./assets/logo.png")} style={styles.logo} />

          <View style={styles.containerCards}>
            <TouchableOpacity style={[styles.card, styles.subCard]}>
              <Text style={styles.subtitle}> Fixas: </Text>
              <Text style={styles.value}> R$ 0,00 </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.card, styles.subCard]}>
              <Text style={styles.subtitle}> Cartão: </Text>
              <Text style={styles.value}> R$ 0,00 </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerCards}>
            <TouchableOpacity style={[styles.card, styles.subCard]}>
              <Text style={styles.subtitle}> Débito </Text>
              <Text style={styles.value}> R$ 0,00 </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.card, styles.subCard]}>
              <Text style={styles.subtitle}>Total:</Text>
              <Text style={styles.value}>R$0,00</Text>
            </TouchableOpacity>
          </View>

          {/*----------------modal------------------*/}
          <ModalScreen
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onSave={handleSaveExpense}
          />
          <TouchableOpacity onPress={() => setCurrentScreen("list")}>
            <Text> Meus de gastos </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={styles.triggercard} // 🚀 Apply the green box styles directly HERE
          >
            <Text style={styles.triggertext}> + </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => setCurrentScreen("home")}
            style={styles.linkButton}
          >
            <Text style={styles.linkButtonText}> ⬅ Voltar </Text>
          </TouchableOpacity>

          <ExpenseList expenseList={expenses} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    flexDirection: "row",
  },

  logo: {
    position: "absolute",
    width: 250,
    height: 250,
    top: 0,
  },

  card: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    borderRadius: 16,
    elevation: 15,
    shadowRadius: 5,
    padding: 20,
    shadowOffset: { width: 10, height: 0 },
    backgroundColor: "#fff",
    margin: 5,
    marginTop: 30,
  },

  subCard: {
    width: "50%",
    margin: 5,
    marginTop: 0,
    paddingVertical: 25,
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

  subtitle: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
    alignItems: "flex-start",
  },

  value: {
    fontSize: 26,
    color: "#333",
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

  buttonTrigger: {
    alignItems: "center",
    justifyContent: "center",
  },

  triggertext: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
});

export default App;
