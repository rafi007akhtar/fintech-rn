import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { BlurView } from "expo-blur";
import CustomHeader from "../../../components/CustomHeader";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarBackground: () => (
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              style={{
                flex: 1,
                backgroundColor: "rgba(62, 61, 61, 0)",
              }}
              tint={"extraLight"}
            />
          ),
          tabBarStyle: {
            backgroundColor: "#00000013",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            borderTopWidth: 0,
            height: "7%",
            paddingTop: 5,
          },
          tabBarInactiveTintColor: "#514d4d",
          tabBarLabelStyle: {
            fontWeight: "bold",
            marginBottom: 5,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="registered" size={size} color={color} />
            ),
            header: () => <CustomHeader />,
            headerTransparent: true,
          }}
        />
        <Tabs.Screen
          name="invest"
          options={{
            title: "Invest",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="line-chart" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="transfers"
          options={{
            title: "Transfers",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="exchange" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="crypto"
          options={{
            title: "Crypto",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="bitcoin" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="lifestyle"
          options={{
            title: "Lifestyle",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="th" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
