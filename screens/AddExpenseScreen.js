import React, { useReducer, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import {
  TransactionContext,
  initialExpense,
  transactionReducer
} from "../contexts/TransactionContext";
import ExpenseInputs from "../components/ExpenseInputs";

const AddExpenseScreen = () => {
  const { addContextTransaction } = useContext(TransactionContext);
  const [state, dispatch] = useReducer(transactionReducer, initialExpense);

  const addExpense = async () => {
    try {
      addContextTransaction(state);
      dispatch({ type: "clear" });
    } catch (error) {
      console.info(error);
    }
  };

  return (
    <View style={styles.container}>
      <ExpenseInputs dispatch={dispatch} expense={state}>
        <Button raised title="Submit Expense" onPress={addExpense} />
      </ExpenseInputs>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
    justifyContent: "space-evenly"
  }
});

export default AddExpenseScreen;
