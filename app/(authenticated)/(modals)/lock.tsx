import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Lock() {
  return (
    <View style={styles.container}>
      <Text>Lock</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
