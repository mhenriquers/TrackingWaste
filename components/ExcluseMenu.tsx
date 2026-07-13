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

// Adicionado o tipo genérico <T> que estende um objeto com 'id'
interface MenuExclusaoGenericoProps<T extends { id: string }> {
  items: T[]; // A lista de dados (bills, expenses, etc.)
  storageKey: string; // A chave específica do AsyncStorage para salvar (@bills:data, @expenses:data)
  title: string; // O título principal do Modal (ex: "Excluir Gastos")
  subtitle: string; // O subtítulo descritivo
  renderTitle: (item: T) => string; // Função que escolhe qual propriedade é o título (ex: item => item.nome)
  renderSubtitle: (item: T) => string; // Função que escolhe qual propriedade é o valor/subtítulo (ex: item => `R$ ${item.valor}`)
  onDelete: (ids: string[]) => void; // Disparado passando os IDs deletados para atualizar a tela principal
  onCancel: () => void; // Fecha o modal
}

// O componente agora aceita o tipo genérico <T>
const MenuExclusaoGenerico = <T extends { id: string }>({
  items,
  storageKey,
  title,
  subtitle,
  renderTitle,
  renderSubtitle,
  onDelete,
  onCancel,
}: MenuExclusaoGenericoProps<T>) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const persistItems = async (updatedItems: T[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedItems));
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar os dados atualizados.");
    }
  };

  const handleSelect = (id: string): void => {
    setSelectedIds((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((item) => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (selectedIds.length === 0) {
      Alert.alert("Atenção", "Selecione pelo menos um item para excluir.");
      return;
    }

    setIsDeleting(true);
    try {
      const updatedItems = items.filter(
        (item) => !selectedIds.includes(item.id),
      );
      await persistItems(updatedItems);

      onDelete(selectedIds);
      setSelectedIds([]);
      onCancel();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível realizar a exclusão.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = (): void => {
    setSelectedIds([]);
    onCancel();
  };

  const renderItem = ({ item }: { item: T }) => (
    <TouchableOpacity
      style={[
        styles.item,
        selectedIds.includes(item.id) && styles.itemSelected,
      ]}
      onPress={() => handleSelect(item.id)}
    >
      <View style={styles.itemContent}>
        {/* Usa as funções dinâmicas passadas por props para renderizar os textos */}
        <Text style={styles.description}>{renderTitle(item)}</Text>
        <Text style={styles.amount}>{renderSubtitle(item)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={items.length > 0}
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            style={styles.list}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhum item disponível.</Text>
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
                (selectedIds.length === 0 || isDeleting) &&
                  styles.buttonDisabled,
              ]}
              onPress={handleConfirmDelete}
              disabled={selectedIds.length === 0 || isDeleting}
            >
              <Text style={styles.deleteText}>
                {isDeleting
                  ? "Excluindo..."
                  : `Excluir (${selectedIds.length})`}
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
  subtitle: { fontSize: 14, color: "#666", marginBottom: 12 },
  list: { maxHeight: 300 },
  item: {
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 8,
  },
  itemSelected: { borderColor: "#e74c3c", backgroundColor: "#fdecea" },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: { fontSize: 16, color: "#333", flex: 1 },
  amount: { fontSize: 16, fontWeight: "600", color: "#333" },
  emptyText: { textAlign: "center", color: "#999", marginTop: 20 },
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
  cancelButton: { backgroundColor: "#ecf0f1" },
  deleteButton: { backgroundColor: "#e74c3c" },
  buttonDisabled: { opacity: 0.5 },
  cancelText: { color: "#333", fontSize: 16, fontWeight: "600" },
  deleteText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

export default MenuExclusaoGenerico;
