import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface BillProps {
  onOpenModal: () => void;
}

const Bills: React.FC<BillProps> = ({ onOpenModal }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.billcontainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textBill}>Internet</Text>

              <Text style={styles.textBill}> R$ 100,00 </Text>
            </View>

            <Text style={styles.subTextBill}> Venc: dia 5 </Text>
          </View>
          <View style={styles.checkMark}></View>
        </View>

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
    justifyContent: "flex-start",
    alignItems: "center",
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
export default Bills;
