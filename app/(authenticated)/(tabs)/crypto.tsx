import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Currency } from "../../../models/crypto.model";

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
    return (
      <View key={currency.id} style={styles.container}>
        {logo && <Image source={{ uri: logo }} style={[styles.logo]} />}
        <Text>{currency.name}</Text>
      </View>
    );
  });

  return <View>{currencyJSX}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  logo: {
    width: 32,
    height: 32,
  },
});
