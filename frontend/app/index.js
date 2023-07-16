// @flow
import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import useSWR from 'swr'

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    flex: 1.0,
    justifyContent: "center"
  }
});

export default function Index(): React.Node {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? "";
  const { data: message } = useSWR(`${apiUrl}/hello/world`, url => fetch(url).then(resp => resp.text()));
  return <View style={styles.container}>
    <Text>{message}</Text>
  </View>
}
