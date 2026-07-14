import * as React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { List, Checkbox } from "react-native-paper";
import { InterfaceBill } from "../Types";

interface RenderItemProps {
  itemCard: InterfaceBill;
  onTogglePaid?: () => void;
}
const RenderCard: React.FC<RenderItemProps> = ({ itemCard, onTogglePaid }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [checked, setChecked] = React.useState(itemCard.pago);

  const handlePress = () => setExpanded(!expanded);

  const handleCheckboxPress = (e: GestureResponderEvent) => {
    e.stopPropagation();
    setChecked(!checked);
    onTogglePaid?.();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={handleCheckboxPress}
      >
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
          {checked ? <Text style={styles.checkmark}>✓</Text> : null}
        </View>
      </TouchableOpacity>
      <View style={styles.cardWrapper}>
        <List.Section>
          <List.Accordion
            title={itemCard.nome}
            onPress={handlePress}
            right={() => (
              <Text style={styles.titleText}> {`Venc. ${itemCard.venc}`}</Text>
            )}
            titleStyle={styles.titleText}
          >
            <List.Item
              title={`R$ ${itemCard.valor.toFixed(2)}`}
              key="valor"
              titleStyle={styles.titleText}
            />
            {itemCard.obs && itemCard.obs.trim() !== "" && (
              <List.Item
                title={`Observação: ${itemCard.obs}`}
                key="observacao"
              />
            )}
          </List.Accordion>
        </List.Section>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginHorizontal: 12,
  },

  checkboxContainer: {
    padding: 4,
    marginRight: 10,
    paddingTop: 30,
  },

  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#9CA3AF",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxChecked: {
    backgroundColor: "#41d606",
    borderColor: "#35b104",
  },

  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  cardWrapper: {
    flex: 1,
  },
});

export default RenderCard;
