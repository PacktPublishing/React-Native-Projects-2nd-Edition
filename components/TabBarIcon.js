import * as React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import Colors from "../constants/Colors";

export default function TabBarIcon(props) {
  return (
    <Icon
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
