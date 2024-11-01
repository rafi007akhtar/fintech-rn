import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function CustomHeader() {
  return (
    <SafeAreaView>
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={100}
        tint="extraLight"
      >
        <View style={[styles.container]}>
          <Link
            href="/(authenticated)/(modals)/account"
            asChild
            style={[styles.roundBtn]}
          >
            <TouchableOpacity>
              <Text style={styles.navText}>R</Text>
            </TouchableOpacity>
          </Link>

          <View style={styles.searchSection}>
            <Ionicons
              name="search"
              style={styles.searchIcon}
              size={20}
              color={Colors.dark}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor={Colors.dark}
              style={styles.input}
            />
          </View>

          <View style={styles.circle}>
            <Ionicons name="stats-chart" size={20} color={Colors.dark} />
          </View>

          <View style={styles.circle}>
            <Ionicons name="card" size={20} color={Colors.dark} />
          </View>
        </View>
      </BlurView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    gap: 10,
    backgroundColor: "transparent",
    paddingHorizontal: 20,
  },
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.lightGray,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10,
    paddingLeft: 0,
    color: Colors.dark,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});
