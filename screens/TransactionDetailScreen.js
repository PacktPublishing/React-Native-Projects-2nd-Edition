import React, { useState, useReducer, useContext } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Card, ListItem, Text, Button, Overlay } from "react-native-elements";

import {
  TransactionContext,
  transactionReducer
} from "../contexts/TransactionContext";
import ExpenseInputs from "../components/ExpenseInputs";

export default function TransactionDetailScreen(props) {
  const [update, setUpdate] = useState(false);
  const { deleteContextTransaction, updateContextTransactions } = useContext(
    TransactionContext
  );
  const [state, dispatch] = useReducer(
    transactionReducer,
    props.route.params.item
  );

  const updateTransaction = () => {
    updateContextTransactions(state);
    setUpdate(false);
  };

  const deleteTransaction = () => {
    deleteContextTransaction(state.id);
    props.navigation.navigate("Transactions");
  };

  return (
    <SafeAreaView>
      <Card style={styles.standardFlex} title={props.route.params.item.title}>
        <View>
          {Object.entries(state).map((transaction, i) => {
            return transaction[0] !== "title" ? (
              <ListItem
                key={i}
                title={
                  <View style={styles.spacedRow}>
                    <Text>{transaction[0]}</Text>
                    <Text>{transaction[1]}</Text>
                  </View>
                }
              />
            ) : null;
          })}
          <View style={styles.spacedRow}>
            <Button
              title="Update"
              buttonStyle={styles.warning}
              onPress={() => setUpdate(true)}
            />
            <Button
              title="Delete"
              buttonStyle={styles.danger}
              onPress={deleteTransaction}
            />
          </View>
          {update && (
            <Overlay isVisible>
              <View style={styles.container}>
                <ExpenseInputs dispatch={dispatch} expense={state}>
                  <View style={styles.spacedRow}>
                    <Button
                      title="Submit"
                      buttonStyle={styles.warning}
                      onPress={updateTransaction}
                    />
                    <Button
                      title="Cancel"
                      buttonStyle={styles.danger}
                      onPress={() => setUpdate(false)}
                    />
                  </View>
                </ExpenseInputs>
              </View>
            </Overlay>
          )}
        </View>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  standardFlex: {
    flex: 1,
    paddingTop: 15
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
    justifyContent: "space-evenly"
  },
  spacedRow: {
    justifyContent: "space-between",
    flexDirection: "row"
  },
  warning: {
    backgroundColor: "orange"
  },
  danger: {
    backgroundColor: "red"
  }
});
