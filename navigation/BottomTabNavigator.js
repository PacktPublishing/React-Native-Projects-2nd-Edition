import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import TransactionDetailScreen from "../screens/TransactionDetailScreen";
import TransactionScreen from "../screens/TransactionScreen";

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TransactionStack = () => {
  return (
    <Stack.Navigator headerMode={"none"}>
      <Stack.Screen name="Transactions" component={TransactionScreen} />
      <Stack.Screen
        name="Transaction Details"
        component={TransactionDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default function BottomTabNavigator({ navigation, route }) {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="bank" />
          )
        }}
      />
      <BottomTab.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="dollar" />
          )
        }}
      />
      <BottomTab.Screen
        name="Transactions"
        component={TransactionStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="credit-card" />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}
