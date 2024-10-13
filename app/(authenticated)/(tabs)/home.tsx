import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";
import RoundBtn from "../../../components/RoundBtn";

const tempBalc = 100;

export default function Home() {
  function onAddMoney() {}

  return (
    <ScrollView style={styles.container}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.currency}>₹</Text>
          <Text style={styles.balance}>{tempBalc}</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundBtn icon="add" onPress={onAddMoney}>
          Add Money
        </RoundBtn>
        <RoundBtn icon="refresh">Exchange</RoundBtn>
        <RoundBtn icon="list">Details</RoundBtn>

        {/* TODO: turn this into a dropdown */}
        <RoundBtn icon="add">More</RoundBtn>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  account: {
    margin: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  currency: {
    fontSize: 20,
    fontWeight: "500",
  },
  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },
  actionRow: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
