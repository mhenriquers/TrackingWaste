import React, { useState } from "react"; // Adicionado useState aqui
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Type } from "../Types";
import MenuExclusaoGenerico from "../components/ExcluseMenu";

interface ExpenseProps {
  expenseList: Type[];
  totalGastoCredito: number;
  totalGastoDebito: number;
  isDeleteMode: boolean;
  setIsDeleteMode: (visible: boolean) => void;
  onDeleteExpenses: (ids: string[]) => void; // Mantemos a função que atualiza a lista global
}

const ExpenseList: React.FC<ExpenseProps> = ({
  expenseList,
  totalGastoCredito,
  totalGastoDebito,
  isDeleteMode,
  setIsDeleteMode,
  onDeleteExpenses,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          //--------------------------------CARD TOTAL---------------------------------//
          <View style={styles.containerCards}>
            <View style={[styles.totalCard, styles.totalCredit]}>
              <Text style={styles.textTotal}>Crédito:</Text>
              <Text style={styles.textoNumberTotal}>
                R$ {totalGastoCredito.toFixed(2)}
              </Text>
            </View>
            <View style={[styles.totalCard, styles.totalDebit]}>
              <Text style={styles.textTotal}>Débito:</Text>
              <Text style={styles.textoNumberTotal}>
                R$ {totalGastoDebito.toFixed(2)}
              </Text>
            </View>
          </View>
        }
        data={expenseList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseCard}>
            <TouchableOpacity>
              <View style={styles.cardSuperior}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Image
                    source={
                      item.category === "credit card"
                        ? require("./../assets/credit-card-icon.png")
                        : require("./../assets/money-icon.png")
                    }
                    style={styles.cardIcon}
                  />
                  <View style={styles.cardTitle}>
                    <Text style={styles.expenseTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text style={styles.expenseValue}>
                    R$ {item.amount.toFixed(2)}
                  </Text>
                </View>
              </View>
              <Text style={styles.expenseInferior}>
                {item.createdAt instanceof Date
                  ? item.createdAt.toLocaleString("pt-BR")
                  : String(item.createdAt)}
              </Text>
              {item.observacao && (
                <Text style={styles.expenseInferior}>{item.observacao} </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      />

      {/* RENDERIZAÇÃO DO MODAL GENÉRICO PARA A LISTA DE GASTOS */}
      {isDeleteMode && (
        <MenuExclusaoGenerico
          items={expenseList} // Aqui dentro da ExpenseList essa variável existe!
          storageKey="expenses"
          title="Excluir Gastos"
          subtitle="Selecione os gastos que deseja remover da lista:"
          renderTitle={(item) => item.title}
          renderSubtitle={(item) => `R$ ${item.amount.toFixed(2)}`}
          onDelete={onDeleteExpenses} // Aqui dentro essa variável também existe!
          onCancel={() => setIsDeleteMode(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerCards: {
    overflow: "visible",
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expenseCard: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingBottom: 15,
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: "#FFF",
    elevation: 10,
  },
  totalCard: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#333",
  },
  totalCredit: {
    left: 10,
    backgroundColor: "#90CAF9",
    minWidth: "40%",
  },
  totalDebit: {
    right: 15,
    marginLeft: 5,
    backgroundColor: "#bfffab",
    minWidth: "40%",
  },
  textTotal: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  textoNumberTotal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 6,
  },
  cardSuperior: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  expenseValue: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "right",
  },
  cardTitle: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: 165,
  },
  expenseTitle: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  expenseInferior: {
    fontSize: 16,
    marginTop: 2,
  },
  cardIcon: {
    height: 50,
    width: 50,
  },
  triggerCard: {
    backgroundColor: "#e74c3c",
    padding: 12,
    margin: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  triggerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ExpenseList;
