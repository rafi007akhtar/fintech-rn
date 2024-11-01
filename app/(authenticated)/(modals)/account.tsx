import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

export default function Account() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName || "user");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [edit, setEdit] = useState(false);
  const { top } = useSafeAreaInsets();

  async function onSaveUser() {
    try {
      await user?.update({ firstName, lastName });
      setEdit(false);
    } catch (e) {
      console.warn("Unable to update user with error:", e);
    } finally {
      setEdit(false);
    }
  }

  async function onCaptureImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64;${result.assets[0].base64}`;
      user?.setProfileImage({ file: base64 });
    }
  }

  return (
    <BlurView
      experimentalBlurMethod="dimezisBlurView"
      style={[styles.container, { paddingTop: top }]}
      intensity={80}
      tint="dark"
    >
      {user && (
        <>
          <View style={styles.userContainer}>
            <TouchableOpacity
              onPress={onCaptureImage}
              style={styles.captureBtn}
            >
              {user.imageUrl && (
                <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
              )}
            </TouchableOpacity>
            <View style={styles.editRow}>
              {!edit && (
                <>
                  <Text style={styles.name}>
                    {firstName} {lastName}
                  </Text>
                  <TouchableOpacity onPress={() => setEdit(true)}>
                    <Ionicons
                      name="ellipsis-horizontal"
                      color="#fff"
                      size={24}
                    />
                  </TouchableOpacity>
                </>
              )}
              {edit && (
                <>
                  <TextInput
                    placeholder="First name"
                    value={firstName}
                    onChangeText={setFirstName}
                    style={[styles.nameInput]}
                  />

                  <TextInput
                    placeholder="Last name"
                    value={lastName}
                    onChangeText={setLastName}
                    style={[styles.nameInput]}
                  />

                  <TouchableOpacity
                    onPress={() => onSaveUser()}
                    style={styles.editBtn}
                  >
                    <Ionicons name="checkmark-outline" color="#fff" size={24} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.btn} onPress={() => signOut()}>
              <Ionicons name="log-out" size={24} color={"#fff"} />
              <Text style={{ color: "#fff", fontSize: 18 }}>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="person" size={24} color={"#fff"} />
              <Text style={{ color: "#fff", fontSize: 18 }}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="bulb" size={24} color={"#fff"} />
              <Text style={{ color: "#fff", fontSize: 18 }}>Learn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="megaphone" size={24} color={"#fff"} />
              <Text style={{ color: "#fff", fontSize: 18, flex: 1 }}>
                Inbox
              </Text>
              <View
                style={{
                  backgroundColor: Colors.primary,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>14</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rbga(0,0,0,0.5)",
  },
  userContainer: {
    marginTop: 16,
    paddingBottom: 200,
    alignItems: "center",
    height: "30%",
    flex: 1,
    alignContent: "center",
  },
  editRow: {
    marginTop: 20,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    gap: 12,
    flex: 1,
  },
  name: {
    fontSize: 20,
    color: "#fff",
    alignItems: "center",
  },
  captureBtn: {
    width: 100,
    height: 100,
    backgroundColor: Colors.gray,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  editBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
  },
  nameInput: {
    width: 140,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    color: Colors.gray,
  },
  actions: {
    backgroundColor: "rgba(256, 256, 256, 0.1)",
    borderRadius: 16,
    gap: 0,
    margin: 20,
    color: "white",
    fontSize: 20,
    marginBottom: 30,
  },
  btn: {
    padding: 14,
    flexDirection: "row",
    gap: 20,
  },
});
