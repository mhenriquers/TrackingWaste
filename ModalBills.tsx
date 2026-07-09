import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { handleBackgroundTap } from "./ModalScreen";

interface ModalBill {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const ModalBill: React.FC<ModalBill> = ({ visible, onClose, onSave }) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const handlePress = () => handleBackgroundTap(isKeyboardVisible, onClose);

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

  //----------------Variaveis de Controle dos inputs----------------------
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [venc, setVenc] = useState("");
  const [obs, setObs] = useState("");

  //--------------------função para salvar a conta--------------------------

  const handleSaveBill = () => {
    if (nome.trim() === "" || valor.trim() === "" || venc.trim() === "") {
      alert("Preencha os campos obrigatórios");
    } else {
      onSave({
        nome,
        valor: parseFloat(valor),
        venc,
        obs,
      });
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={handlePress}>
          <View style={styles.containerModal}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalCard}>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText}> Adicionar Conta </Text>
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
                      placeholder="Digite o nome da compra"
                      value={nome}
                      onChangeText={setNome}
                    />
                  </View>

                  {/*--------------input Valor--------------*/}

                  <View style={styles.containerLabel}>
                    <Text style={styles.modaltext}>Valor: </Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Digite o valor da Compra"
                      keyboardType="numeric"
                      value={valor}
                      onChangeText={setValor}
                    />
                  </View>
                  {/*--------------input Venc.---------------*/}

                  <View style={styles.containerLabel}>
                    <Text style={styles.modaltext}> Venc.: </Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Digite a data de vencimento"
                      value={venc}
                      onChangeText={setVenc}
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

                  <View style={styles.containerButton}>
                    <TouchableOpacity onPress={onClose}>
                      <View style={styles.buttonCancel}>
                        <Text style={styles.buttonText}> Cancelar </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSaveBill}>
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
  containerModal: {
    flex: 1,
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
export default ModalBill;
