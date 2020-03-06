import React, { useEffect, useState, useContext } from "react";
import { View, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { ListItem, Text } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import { TransactionContext } from "../contexts/TransactionContext";

const TransactionScreen = props => {
  const { getContextTransactions } = useContext(TransactionContext);
  const [transactions, setTransactions] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getData = async () => {
      try {
        const getTransactions = await getContextTransactions();
        setTransactions(getTransactions);
      } catch (error) {
        console.info(error);
      }
    };
    getData();
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <ListItem
      title={
        <View style={styles.transactionContainer}>
          <Text>{item.title}</Text>
          <Text style={styles.transactionText}>{item.amount}</Text>
        </View>
      }
      subtitle={<Text>{item.date}</Text>}
      bottomDivider
      chevron
      onPress={() =>
        props.navigation.navigate("Transaction Details", {
          item
        })
      }
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={transactions}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  transactionContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  transactionText: {
    color: "red"
  }
});

export default TransactionScreen;
