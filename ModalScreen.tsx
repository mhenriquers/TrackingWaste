import React, { FC, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Type } from "./Types";

interface ModalScreenProps {
  visible: boolean;
  onClose: () => void;
  onSave: (expenseData: Omit<Type, "id" | "createdAt">) => void;
}

//---------------------- função pra tirar modal e fechar teclado ao tocar fora--------------------------
export const handleBackgroundTap = (
  isKeyboardVisible: boolean,
  onClose: () => void,
) => {
  if (isKeyboardVisible) {
    Keyboard.dismiss();
  } else {
    onClose();
  }
};
const ModalScreen: React.FC<ModalScreenProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  //-----------------------varavel de controle do teclado-----------------------------
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<"credit card" | "debit">(
    "credit card",
  );
  const [nameExpense, setNameExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [obs, setObs] = useState("");

  //-------------------------------- função que adiciona e salva card---------------------
  const handleAdd = () => {
    if (nameExpense.trim() === "" || amount.trim() === "") {
      alert("Preencha os Campos de Nome e Valor!");
    }
    const valorNumerico = parseFloat(amount.replace(",", "."));

    if (isNaN(valorNumerico)) {
      return;
    }
    onSave({
      title: nameExpense,
      amount: valorNumerico,
      category: paymentMethod,
      observacao: obs,
    });
    setNameExpense("");
    setAmount("");
    setObs("");
  };

  React.useEffect(() => {
    const showlistener = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });
    const hidelistener = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showlistener.remove();
      hidelistener.remove();
    };
  }, []);

  const handlePress = () => handleBackgroundTap(isKeyboardVisible, onClose);

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={handlePress}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalCard}>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText}> Adicionar Gasto </Text>
                  <TouchableOpacity onPress={onClose}>
                    <View style={styles.closeImageContainer}>
                      <Image
                        source={require("./assets/closeImage.png")}
                        style={styles.closeImage}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                {/*-----------------------------Cards de Inputs -----------------------------*/}

                <View style={styles.generalContainer}>
                  {/*---------------input Nome--------------*/}

                  <View style={styles.containerLabel}>
                    <Text style={styles.modaltext}>Nome: </Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Nome da compra"
                      value={nameExpense}
                      onChangeText={setNameExpense}
                    />
                  </View>
                  {/*--------------input Valor--------------*/}
                  <View style={styles.containerLabel}>
                    <Text style={styles.modaltext}>Valor: </Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Valor da Compra"
                      value={amount}
                      onChangeText={setAmount}
                      keyboardType="numeric"
                    />
                  </View>

                  {/*-------------input Obs-----------------*/}

                  <View style={styles.containerLabel}>
                    <Text style={styles.modaltext}> Obs : </Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Observação (opcional)"
                      value={obs}
                      onChangeText={setObs}
                    />
                  </View>

                  <View style={styles.containerLabel}>
                    <Text style={styles.modaltext}> Tipo: </Text>
                    <View style={styles.menu}>
                      {/*-----------------------------------Credit Card Option----------------------------------------*/}

                      <TouchableOpacity
                        style={[
                          styles.menuButton,
                          paymentMethod === "credit card" &&
                            styles.activeMenuButton,
                        ]}
                        onPress={() => setPaymentMethod("credit card")}
                      >
                        <Text
                          style={[
                            styles.menuButtonText,
                            paymentMethod === "credit card" &&
                              styles.activeMenuText,
                          ]}
                        >
                          Crédito
                        </Text>
                      </TouchableOpacity>

                      {/*-----------------------------------Debit Option--------------------------------------------- */}
                      <TouchableOpacity
                        style={[
                          styles.menuButton,
                          paymentMethod === "debit" && styles.activeMenuButton,
                        ]}
                        onPress={() => setPaymentMethod("debit")}
                      >
                        <Text
                          style={[
                            styles.menuButtonText,
                            paymentMethod === "debit" && styles.activeMenuText,
                          ]}
                        >
                          Débito
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.containerButton}>
                    <TouchableOpacity onPress={onClose}>
                      <View style={styles.buttonCancel}>
                        <Text style={styles.buttonText}> Cancelar </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleAdd}>
                      <View style={styles.buttonSave}>
                        <Text style={styles.buttonText}> Adicionar </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalCard: {
    position: "absolute",
    top: "20%",
    right: "10%",
    width: "80%",
    borderRadius: 16,
    elevation: 15,
    shadowRadius: 5,
    backgroundColor: "#fff",
  },

  generalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  titleContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    paddingLeft: 10,
    paddingTop: 10,
  },

  closeImageContainer: {
    alignSelf: "flex-end",
  },

  closeImage: {
    width: 30,
    height: 30,
    margin: 15,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },

  containerLabel: {
    flexDirection: "row",
    height: 60,
    justifyContent: "center",
  },

  modaltext: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
    marginTop: 15,
    width: "20%",
  },

  input: {
    width: "65%",
    height: "auto",
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },

  menu: {
    flexDirection: "row",
    width: "65%",
    height: 45,
    margin: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    overflow: "hidden",
  },

  menuButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },

  activeMenuButton: {
    backgroundColor: "#41d606",
  },

  menuButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },

  activeMenuText: {
    color: "#fff",
  },

  containerButton: {
    flexDirection: "row",
  },

  buttonCancel: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fafafa",
    borderRadius: 10,
    marginTop: 15,
    marginRight: 20,
    backgroundColor: "red",
  },

  buttonSave: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fafafa",
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 20,
    backgroundColor: "#41d606",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 15,
    color: "#fff",
  },
});

export default ModalScreen;
