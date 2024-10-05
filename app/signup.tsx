import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "../constants/Styles";
import Colors from "../constants/Colors";

export default function SignUp() {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");

  // TODO: implement this later, when integrating with Clerk
  async function onSignup() {}

  return (
    <View style={[defaultStyles.container]}>
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
});
