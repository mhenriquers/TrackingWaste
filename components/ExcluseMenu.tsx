import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { InterfaceBill } from "../Types";

interface MenuExclusaoProps {
  bills: InterfaceBill[];
  onDelete: (id: string) => void;
  onCancel: () => void;
}

const STORAGE_KEY = "@bills:data";

const MenuExclusao: React.FC<MenuExclusaoProps> = ({
  bills,
  onDelete,
  onCancel,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const persistBills = async (updatedBills: InterfaceBill[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBills));
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    }
  };

  const handleSelect = (id: string): void => {
    setSelectedId(id);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!selectedId) {
      Alert.alert("Atenção", "Selecione uma conta para excluir.");
      return;
    }

    setIsDeleting(true);
    try {
      const updatedBills = bills.filter((bill) => bill.id !== selectedId);
      await persistBills(updatedBills);
      onDelete(selectedId);
      setSelectedId(null);
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir a conta.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = (): void => {
    setSelectedId(null);
    setModalVisible(false);
    onCancel();
  };

  const renderItem = ({ item }: { item: InterfaceBill }) => (
    <TouchableOpacity
      style={[styles.item, selectedId === item.id && styles.itemSelected]}
      onPress={() => handleSelect(item.id)}
    >
      <View style={styles.itemContent}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.amount}>R$ {item.amount.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Excluir Conta</Text>

          <Text style={styles.subtitle}>
            Selecione a conta que deseja excluir:
          </Text>

          <FlatList
            data={bills}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            style={styles.list}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhuma conta disponível.</Text>
            }
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
              disabled={isDeleting}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.deleteButton,
                (!selectedId || isDeleting) && styles.buttonDisabled,
              ]}
              onPress={handleConfirmDelete}
              disabled={!selectedId || isDeleting}
            >
              <Text style={styles.deleteText}>
                {isDeleting ? "Excluindo..." : "Excluir"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    maxHeight: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  list: {
    maxHeight: 300,
  },
  item: {
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 8,
  },
  itemSelected: {
    borderColor: "#e74c3c",
    backgroundColor: "#fdecea",
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: "#ecf0f1",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  cancelText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MenuExclusao;
