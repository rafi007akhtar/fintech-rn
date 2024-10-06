import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "../constants/Styles";
import Colors from "../constants/Colors";
import { Link } from "expo-router";

export default function SignUp() {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");

  // TODO: implement this later, when integrating with Clerk
  async function onSignup() {}

  return (
    <View style={[defaultStyles.container, styles.container]}>
      <Text style={[defaultStyles.header]}>Let's get started!</Text>
      <Text style={defaultStyles.descriptionText}>
        Enter your phone number. We will send you a confirmation code there.
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

      <Link href="/login" replace asChild>
        <TouchableOpacity>
          <Text style={defaultStyles.textLink}>
            Already have an account? Log in.
          </Text>
        </TouchableOpacity>
      </Link>

      <View style={{ flex: 1 }}></View>

      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          styles.signUpBtn,
          phoneNumber.length ? styles.enabled : styles.disabled,
        ]}
        onPress={onSignup}
      >
        <Text style={[defaultStyles.buttonText]}>Sign Up!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
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
