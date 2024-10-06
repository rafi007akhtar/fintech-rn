import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "../constants/Styles";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";

enum LoginType {
  Phone,
  Email,
  Google,
  Apple,
}

const initContryCode = "+91";

export default function Login() {
  const [countryCode, setCountryCode] = useState(initContryCode);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullNumber, setFullNumber] = useState(initContryCode);

  const router = useRouter();
  const { signIn } = useSignIn();

  useEffect(() => {
    setFullNumber(`${countryCode}${phoneNumber}`);
  }, [countryCode, phoneNumber]);

  async function onLogin(loginType: LoginType) {
    if (loginType === LoginType.Phone) {
      try {
        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullNumber,
        });

        const firstPhoneFactor = supportedFirstFactors?.find(
          (factor) => factor.strategy === "phone_code"
        );
        const phoneNumberId = firstPhoneFactor?.phoneNumberId;

        await signIn!.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId: phoneNumberId!,
        });

        router.push({
          pathname: "/[phone]",
          params: {
            phone: fullNumber,
            signin: "true",
          },
        });
      } catch (err) {
        console.log("error", JSON.stringify(err, null, 2));
        if (isClerkAPIResponseError(err)) {
          Alert.alert("Error", err.errors[0].message);
        }
      }
    }
  }

  return (
    <View style={[defaultStyles.container]}>
      <Text style={[defaultStyles.header]}>Welcome back</Text>
      <Text style={defaultStyles.descriptionText}>
        Enter the phone number associated with your account.
      </Text>

      <View style={[styles.inputContainer]}>
        <TextInput
          style={styles.mobileInput}
          placeholderTextColor={Colors.gray}
          value={countryCode}
          onChangeText={setCountryCode}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Mobile number"
          placeholderTextColor={Colors.gray}
          style={[styles.mobileInput, { flex: 1 }]}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          styles.signUpBtn,
          phoneNumber.length ? styles.enabled : styles.disabled,
        ]}
        onPress={() => onLogin(LoginType.Phone)}
      >
        <Text style={[defaultStyles.buttonText]}>Continue</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <View
          style={{
            flex: 1,
            height: StyleSheet.hairlineWidth,
            backgroundColor: Colors.gray,
          }}
        ></View>
        <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
        <View
          style={{
            flex: 1,
            height: StyleSheet.hairlineWidth,
            backgroundColor: Colors.gray,
          }}
        ></View>
      </View>

      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          {
            flexDirection: "row",
            gap: 16,
            marginTop: 20,
            backgroundColor: "#fff",
          },
        ]}
        onPress={() => onLogin(LoginType.Email)}
      >
        <Ionicons name="mail" size={24} color="#000" />
        <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
          Continue with email
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          {
            flexDirection: "row",
            gap: 16,
            marginTop: 20,
            backgroundColor: "#fff",
          },
        ]}
        onPress={() => onLogin(LoginType.Google)}
      >
        <Ionicons name="logo-google" size={24} color="#000" />
        <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
          Continue with Google
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          {
            flexDirection: "row",
            gap: 16,
            marginTop: 20,
            backgroundColor: "#fff",
          },
        ]}
        onPress={() => onLogin(LoginType.Apple)}
      >
        <Ionicons name="logo-apple" size={24} color="#000" />
        <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
          Continue with Apple
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
  },
  mobileInput: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  signUpBtn: {
    marginVertical: 20,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});
