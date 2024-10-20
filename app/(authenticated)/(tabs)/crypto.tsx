import { View, Text } from "react-native";
import React, { useEffect } from "react";

export default function Crypto() {
  useEffect(() => {
    async function getListings() {
      const response = await fetch("/api/listings");
      const result = await response.json();
      console.log("result:", result);
    }
    getListings();
  }, []);
  return (
    <View>
      <Text>Crypto</Text>
    </View>
  );
}
