import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";

interface MenuOverlayProps {
  isVisible: boolean;
  dataLength: number;
  dataType: "bills" | "expenses";
  onOpen: () => void;
  onClose: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({
  isVisible,
  dataLength,
  dataType,
  onOpen,
  onClose,
}) => {
  const handlePressDelete = () => {
    if (dataLength > 0) {
      onOpen();
    } else {
      const message =
        dataType === "bills"
          ? "Não há contas para apagar."
          : "Não há despesas para apagar.";

      Alert.alert("Aviso", message);
      onClose();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handlePressDelete}
              activeOpacity={0.7}
            >
              <Text style={styles.deleteText}>Apagar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 60,
    paddingRight: 20,
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    width: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  deleteText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MenuOverlay;
