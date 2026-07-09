import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InterfaceBill } from "./Types";
import RenderCard from "./RenderCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface BillProps {
  onOpenModal: () => void;
  bills: InterfaceBill[];
}

const Bills: React.FC<BillProps> = ({ onOpenModal, bills }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={bills}
        renderItem={({ item }) => <RenderCard itemCard={item} />}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity onPress={onOpenModal} style={styles.triggercard}>
        <Text style={styles.triggertext}> + </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
export default Bills;
