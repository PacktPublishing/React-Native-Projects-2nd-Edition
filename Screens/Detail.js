import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Image, Text } from "react-native-elements";
import { useFetch } from "../Hooks/fetchHook";
export const Detail = props => {
  const [uri, setURI] = useState("https://imgplaceholder.com/72x80");
  const { response } = useFetch("https://aws.random.cat/meow");

  useEffect(() => {
    try {
      console.info(response);
      setURI(response?.file);
    } catch (error) {
      file("https://imgplaceholder.com/72x80");
    }
  }, [response]);

  return (
    <>
      <Text h4>{props.text}</Text>
      <Image
        source={{ uri }}
        containerStyle={{ flex: 1 }}
        resizeMode="contain"
        PlaceholderContent={<ActivityIndicator />}
      />
    </>
  );
};
