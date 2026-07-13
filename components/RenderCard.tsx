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
}
const RenderCard: React.FC<RenderItemProps> = ({ itemCard }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);
  const handleCheckboxPress = (e: GestureResponderEvent) => {
    e.stopPropagation();
    setChecked(!checked);
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
              <Text style={styles.titleText}> {`Venc: ${itemCard.venc}`}</Text>
            )}
            titleStyle={styles.titleText}
          >
            <List.Item
              title={`R$ ${itemCard.valor.toFixed(2)}`}
              key="valor"
              titleStyle={styles.titleText}
            />
            <List.Item title={`Observação: ${itemCard.obs}`} key="observacao" />
          </List.Accordion>
        </List.Section>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 6,
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
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
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
