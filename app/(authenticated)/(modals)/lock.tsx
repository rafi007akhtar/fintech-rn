import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../constants/Colors";
import * as Haptics from "expo-haptics";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const ANIMATE_OFFSET = 20;
const ANIMATE_TIME_MS = 80;
const UNLOCK_CODE = "123456"; // NOTE: in a real application, this shouldn't be hard-coded like this

export default function Lock() {
  const { user } = useUser();
  const [code, setCode] = useState<number[]>([]);
  const [firstName] = useState(user?.firstName || "user");
  const router = useRouter();

  const offset = useSharedValue(0);
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const codeBoxes = Array(6).fill(0);

  const codeNumbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ["face", 0, "back"],
  ];

  async function onNumberPress(num: number | string) {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (typeof num === "string") {
      if (num === "back") {
        setCode(code.slice(0, -1));
      } else if (num === "face") {
        performBiometricAuth();
      }
      return;
    }

    setCode([...code, num]);
  }

  async function performBiometricAuth() {
    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      unlockNavigation();
    } else {
      unlockError();
    }
  }

  function unlockNavigation() {
    router.replace("/(authenticated)/(tabs)/home");
  }

  function unlockError() {
    offset.value = withSequence(
      withTiming(-ANIMATE_OFFSET, { duration: ANIMATE_TIME_MS / 2 }),
      withRepeat(
        withTiming(ANIMATE_OFFSET, { duration: ANIMATE_TIME_MS }),
        4,
        true
      ),
      withTiming(0, { duration: ANIMATE_TIME_MS / 2 })
    );
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    setCode([]);
  }

  useEffect(() => {
    performBiometricAuth();
  }, []);

  useEffect(() => {
    if (code.length === 6) {
      console.log({ code });
      if (code.join("") === UNLOCK_CODE) {
        setCode([]);
        unlockNavigation();
      } else {
        unlockError();
      }
    }
  }, [code]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Welcome back, {firstName}.</Text>
      <Animated.View style={[styles.codeView, style]}>
        {codeBoxes.map((_, ind) => (
          <View
            key={ind}
            style={[
              styles.codeEmpty,
              {
                backgroundColor:
                  code[ind] >= 0 ? Colors.primary : Colors.lightGray,
              },
            ]}
          ></View>
        ))}
      </Animated.View>

      <View style={[styles.numbersView]}>
        {codeNumbers.map((numRow, ind) => (
          <View style={[styles.numbersRow]} key={`r-${ind}`}>
            {numRow.map((val, ind2) => {
              let toShow: any = val;
              if (val === "face") {
                toShow = (
                  <MaterialCommunityIcons
                    name="face-recognition"
                    size={26}
                    style={styles.numberIcon}
                  />
                );
              } else if (val === "back") {
                toShow = (
                  <MaterialCommunityIcons
                    name="backspace-outline"
                    size={26}
                    style={styles.numberIcon}
                  />
                );
                if (code.length === 0) {
                  toShow = null;
                }
              }

              let elem = (
                <TouchableOpacity
                  key={`c-${ind2}`}
                  onPress={() => onNumberPress(val)}
                >
                  <Text
                    style={[styles.number, val === "back" && styles.numberIcon]}
                  >
                    {toShow}
                  </Text>
                </TouchableOpacity>
              );
              return elem;
            })}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 80,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
  },
  codeView: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginVertical: 100,
    alignItems: "center",
  },
  codeEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  numbersView: {
    marginHorizontal: 80,
    gap: 60,
  },
  numbersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  number: {
    fontSize: 32,
    width: 40,
  },
  numberIcon: {
    fontWeight: "bold",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
