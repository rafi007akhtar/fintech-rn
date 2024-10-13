import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { RoundBtnProps } from "../models/components.model";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default function RoundBtn(props: RoundBtnProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.circle}>
        <Ionicons name={props.icon} size={30} color={Colors.dark} />
      </View>
      <Text style={styles.label}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },
  circle: {
    width: 60,
    height: 60,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.dark,
  },
});
