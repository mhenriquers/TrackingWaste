import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InterfaceBill } from "../Types";
import RenderCard from "../components/RenderCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuOverlay from "../components/MenuOverlay";
import { useNavigation } from "@react-navigation/native";
import HeaderMenu from "../components/HeaderMenu";
import MenuExclusao from "../components/ExcluseMenu";

interface BillProps {
  onOpenModal: () => void;
  innerBill: InterfaceBill[];
}

const Bills: React.FC<BillProps> = ({ onOpenModal, innerBill }) => {
  //-------------------------------- variaveis de controle

  const navigation = useNavigation();
  const [bills, setBills] = useState<InterfaceBill[]>([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedBillIds, setSelectedBillIds] = useState<string[]>([]);

  //-------------------------função para salvar contas fixas

  const saveBills = async (updatedBills: InterfaceBill[]) => {
    try {
      await AsyncStorage.setItem("bills", JSON.stringify(updatedBills));
    } catch (error) {
      console.error("Erro ao salvar contas", error);
    }
  };

  //----------------------------------- função para deletar contas fixas

  const handleDeleteBill = () => {
    if (selectedBillIds.length > 0) {
      const updatedBills = bills.filter(
        (bill) => !selectedBillIds.includes(bill.id),
      );
      setBills(updatedBills);
      setSelectedBillIds([]);
      alert("Conta excluída!");
    } else {
      alert("Não há mais nada que possa ser feito!");
    }
  };

  useEffect(() => {
    setBills(innerBill);
  }, [innerBill]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderMenu
          onMenuPress={() => setIsMenuVisible(true)}
          imageStyle={{ width: 40, height: 40, marginRight: 10 }}
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={bills}
        renderItem={({ item }) => <RenderCard itemCard={item} />}
        keyExtractor={(item, index) => index.toString()}
      />

      <MenuOverlay
        isVisible={isMenuVisible}
        dataLength={bills.length}
        dataType="bills"
        onOpen={() => {
          setIsDeleteMode(true);
          setIsMenuVisible(false);
        }}
        onClose={() => setIsMenuVisible(false)}
      />

      {isDeleteMode && (
        <MenuExclusao
          bills={bills}
          onDelete={handleDeleteBill}
          onCancel={() => setIsDeleteMode(false)}
        />
      )}

      {/*----------------------Tela de Menu De Exclusão------------------ */}

      {isDeleteMode && (
        <View style={styles.containerButtons}>
          <TouchableOpacity
            onPress={() => {
              setIsDeleteMode(false);
              setSelectedBillIds([]);
            }}
            style={styles.cancelButton}
          >
            <Text style={styles.textButtons}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleDeleteBill();
              setIsDeleteMode(false);
            }}
            style={styles.eraserButton}
          >
            <Text style={styles.textButtons}>Apagar</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPress={onOpenModal} style={styles.triggercard}>
        <Text style={styles.triggertext}> + </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  triggercard: {
    position: "absolute",
    bottom: 70,
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

  containerButtons: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 100,
  },

  textButtons: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },

  cancelButton: {
    backgroundColor: "#75d0fa",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },

  eraserButton: {
    backgroundColor: "#d60606",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },
});
export default Bills;
