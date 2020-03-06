import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Actions } from "react-native-router-flux";
import { ListItem } from "react-native-elements";

import { useFetch } from "../Hooks/fetchHook";

export const Home = () => {
  const [facts, setFacts] = useState();
  const { response } = useFetch("https://cat-fact.herokuapp.com/facts");

  useEffect(() => {
    try {
      setFacts([...response?.all]);
    } catch (error) {
      setFacts([{ text: "loading" }]);
    }
  }, [response]);

  const renderItem = ({ item, index }) => {
    return (
      <ListItem
        onPress={() => {
          Actions.Detail({ title: `Cat Fact #${index + 1}`, text: item.text });
        }}
        title={`cat fact #${index + 1}`}
        subtitle={item.text}
        subtitleStyle={{ padding: 10 }}
        bottomDivider
        chevron
      />
    );
  };

  return (
    <FlatList
      data={facts}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.id}${index}`}
    />
  );
};
