import React, { createContext, Component } from "react";
import { Alert, AsyncStorage } from "react-native";

const today = new Date().toLocaleDateString(undefined, {
  year: "numeric",
  month: "numeric",
  day: "numeric"
});

export const errorHandler = e => {
  Alert.alert(
    "Transaction Error",
    `Sorry about the issue: ${e}`,
    [
      {
        text: "ok"
      }
    ],
    { cancelable: false }
  );
};

export const initialExpense = {
  title: "",
  date: today,
  amount: 0,
  notes: "",
  created: today,
  updated: today
};

export const transactionReducer = (state, action) => {
  switch (action.type) {
    case "title":
      return { ...state, title: action.field };
    case "date":
      return { ...state, date: action.field };
    case "amount":
      return { ...state, amount: action.field };
    case "notes":
      return { ...state, notes: action.field };
    case "clear":
      return initialExpense;
    default:
      throw new Error("unexpected action");
  }
};

export const TransactionContext = createContext();

export class TransactionProvider extends Component {
  constructor(props) {
    super(props);

    this.addContextTransaction = async newTransaction => {
      try {
        await this.getContextTransactions();
        const { contextTransactions } = this.state;
        newTransaction.id = Math.floor(Math.random() * 1000000 + 1);
        contextTransactions.push(newTransaction);

        this.setState(
          { contextTransactions },
          async () => await this.storeData()
        );
      } catch (error) {
        errorHandler(error);
      }
    };

    this.getContextTransactions = async () => {
      try {
        const storedTransactions = await AsyncStorage.getItem("@transactions");

        if (storedTransactions) {
          this.setState({
            contextTransactions: [...JSON.parse(storedTransactions)]
          });
        }
        return this.state.contextTransactions;
      } catch (error) {
        errorHandler(error);
      }
    };

    this.updateContextTransactions = async transaction => {
      try {
        const { contextTransactions } = this.state;

        const transactionIndex = contextTransactions.findIndex(
          item => item.id === transaction.id
        );

        contextTransactions[transactionIndex].title = transaction.title;
        contextTransactions[transactionIndex].date = transaction.date;
        contextTransactions[transactionIndex].amount = transaction.amount;
        contextTransactions[transactionIndex].notes = transaction.notes;
        this.setState(
          { contextTransactions },
          async () => await this.storeData()
        );
      } catch (error) {
        errorHandler(error);
      }
    };

    this.deleteContextTransaction = async id => {
      try {
        const { contextTransactions: oldTransaction } = this.state;
        const contextTransactions = oldTransaction.filter(
          transaction => transaction.id !== id
        );
        this.setState(
          { contextTransactions },
          async () => await this.storeData()
        );
      } catch (error) {
        errorHandler(error);
      }
    };

    this.state = {
      addContextTransaction: this.addContextTransaction,
      getContextTransactions: this.getContextTransactions,
      updateContextTransactions: this.updateContextTransactions,
      deleteContextTransaction: this.deleteContextTransaction,
      contextTransactions: []
    };
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem(
        "@transactions",
        JSON.stringify([...this.state.contextTransactions])
      );
    } catch (error) {
      errorHandler(error);
    }
  };

  render() {
    return (
      <TransactionContext.Provider value={this.state}>
        {this.props.children}
      </TransactionContext.Provider>
    );
  }
}
