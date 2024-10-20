import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";
import RoundBtn from "../../../components/RoundBtn";
import Dropdown from "../../../components/Dropdown";
import { useBalanceStore } from "../../../store/balanceStore";
import { defaultStyles } from "../../../constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import WidgetList from "../../../components/SortableList/WidgetList";
import { useHeaderHeight } from "@react-navigation/elements";

export default function Home() {
  const { balance, clearBalance, runTransaction, transactions } =
    useBalanceStore();
  const headerHeight = useHeaderHeight();

  function onAddMoney() {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000 * (Math.random() > 0.5 ? 1 : -1)),
      date: new Date(),
      title: "Added money",
    });
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
    >
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.currency}>₹</Text>
          <Text style={styles.balance}>{balance()}</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundBtn icon="add" onPress={onAddMoney}>
          Add Money
        </RoundBtn>
        <RoundBtn icon="refresh" onPress={clearBalance}>
          Exchange
        </RoundBtn>
        <RoundBtn icon="list">Details</RoundBtn>
        <Dropdown />
      </View>

      <Text style={[defaultStyles.sectionHeader]}>Transactions</Text>
      <View style={styles.transactions}>
        {!transactions.length ? (
          <Text style={styles.noTransactionsText}>No transactions yet</Text>
        ) : (
          <View>
            {transactions.map((transaction) => (
              <View key={transaction.id} style={[styles.transaction]}>
                <View style={[defaultStyles.circle]}>
                  <Ionicons
                    name={transaction.amount > 0 ? "add" : "remove"}
                    size={24}
                    color={Colors.dark}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.transactionTitle}>
                    {transaction.title}
                  </Text>
                  <Text style={[styles.transactionDate]}>
                    {transaction?.date && transaction?.date?.toLocaleString()}
                  </Text>
                </View>
                <Text>₹ {transaction.amount}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
      <WidgetList />
      <View style={styles.spacer}></View>
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
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  noTransactionsText: {
    color: Colors.gray,
  },
  transaction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 14,
  },
  transactionTitle: {
    fontWeight: "400",
  },
  transactionDate: {
    fontSize: 12,
    color: Colors.gray,
  },
  spacer: {
    marginVertical: 20,
  },
});
