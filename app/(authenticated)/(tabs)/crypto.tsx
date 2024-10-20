import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Currency } from "../../../models/crypto.model";
import { Link } from "expo-router";
import Colors from "../../../constants/Colors";
import { defaultStyles } from "../../../constants/Styles";
import { Ionicons } from "@expo/vector-icons";

export default function Crypto() {
  const currencies = useQuery({
    queryKey: ["listings"],
    queryFn: () => fetch("/api/listings").then((res) => res.json()),
  });

  const ids = currencies.data
    ?.map((currency: Currency) => currency.id)
    .join(",");

  const { data } = useQuery({
    queryKey: ["info"],
    queryFn: () => fetch(`/api/info?id=${ids}`).then((res) => res.json()),
    enabled: !!ids,
  });

  const currencyJSX = currencies.data?.map((currency: Currency) => {
    let logo;
    if (data) {
      logo = data[currency.id].logo;
    }
    const lastHourChange = currency.quote.INR.percent_change_1h;
    const priceIncrease = lastHourChange > 0;
    const arrowSignal = priceIncrease ? "caret-up" : "caret-down";
    const colorSignal = priceIncrease ? "green" : "red";
    return (
      <Link key={currency.id} href={`/crypto/${currency.id}` as any} asChild>
        <TouchableOpacity style={styles.cryptoContainer}>
          {logo && <Image source={{ uri: logo }} style={[styles.logo]} />}
          <View style={styles.cryptoText}>
            <Text style={styles.cryptoName}>{currency.name}</Text>
            <Text style={styles.cryptoSymbol}>{currency.symbol}</Text>
          </View>

          <View style={styles.priceChangeContainer}>
            <Text>₹ {currency.quote.INR.price.toFixed(2)}</Text>
            <View style={styles.priceChange}>
              <Ionicons name={arrowSignal} size={16} color={colorSignal} />
              <Text style={{ color: colorSignal }}>
                {lastHourChange.toFixed(2)} %
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={[defaultStyles.sectionHeader]}>Latest crypto</Text>
      <View style={defaultStyles.block}>{currencyJSX}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  cryptoContainer: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  cryptoText: {
    flex: 1,
    gap: 6,
  },
  cryptoName: {
    color: Colors.dark,
    fontWeight: "600",
  },
  cryptoSymbol: {
    color: Colors.gray,
  },
  logo: {
    width: 40,
    height: 40,
  },
  priceChangeContainer: {
    alignItems: "flex-end",
    gap: 6,
  },
  priceChange: {
    flexDirection: "row",
    gap: 4,
  },
});
