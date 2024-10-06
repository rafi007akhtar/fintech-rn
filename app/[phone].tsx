import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function Phone() {
  const { phone } = useLocalSearchParams<{ phone: string; signin?: string }>();

  return (
    <View>
      <Text>Phone: {phone}</Text>
    </View>
  );
}
