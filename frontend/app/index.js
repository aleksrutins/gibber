// @flow
import * as React from "react";
import { View, StyleSheet, Text } from "react-native";


const styles = StyleSheet.create({
      container: {
        backgroundColor: "#fff",
        alignItems: "center",
        flex: 1.0,
        justifyContent: "center"
      }
    });

export default (): React.Node =>
    <View style={styles.container}>
      <Text>Hello world!</Text>
    </View>
