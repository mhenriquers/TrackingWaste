import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Tracking Waste</Text>
        <View style={styles.card}>
          <Text style={styles.subtitle}>Total Gasto:</Text>
          <Text style={styles.value}>$0.00</Text>
        </View>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalcard}>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modaltext}>X</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={styles.triggercard}>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Text style={styles.triggertext}> + </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  card: {
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    borderRadius: 16,
    elevation: 5,
    shadowRadius: 5,
    padding: 20,
    shadowOffset: { width: 10, height: 0 },
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 26,
    color: "#666",
  },
  value: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  modalcard: {
    position: "absolute",
    top: "25%",
    right: "10%",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    width: "80%",
    height: "50%",
    borderRadius: 5,
    elevation: 5,
    shadowRadius: 5,
    backgroundColor: "#888",
    opacity: 0.9,
  },
  modaltext: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    margin: 10,
    padding: 10,
    paddingRight: 15,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
  },
  triggercard: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: "#47e907",
    justifyContent: "center",
    alignItems: "center",
  },
  triggertext: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
});

export default App;
