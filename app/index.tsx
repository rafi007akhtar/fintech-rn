import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { defaultStyles } from "../constants/Styles";
import Colors from "../constants/Colors";
import React from "react";

export default function Page() {
  const video = React.useRef(null);
  const [assets] = useAssets([require("@/assets/videos/intro_5.mp4")]);

  if (assets) {
    // assets[0].height = 500;
    // assets[0].width = 500;
    console.log("video assets", assets[0]);
  }

  return (
    <View style={styles.container}>
      {assets && (
        <Video
          ref={video}
          source={{
            uri: assets[0].uri,
          }}
          style={styles.video}
          isMuted
          isLooping
          shouldPlay
          videoStyle={{ backgroundColor: "grey" }}
          resizeMode={ResizeMode.COVER}
        />
      )}

      <View style={styles.header}>
        <Text style={styles.headerText}>
          Ready to change the way you money?
        </Text>
      </View>

      <View style={styles.buttons}>
        <Link
          href={"/login"}
          asChild
          style={[defaultStyles.pillButton, styles.link]}
        >
          <TouchableOpacity>
            <Text style={[styles.loginBtn, styles.btn]}>Login</Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={"/signup"}
          asChild
          style={[defaultStyles.pillButton, styles.link, styles.signupLink]}
        >
          <TouchableOpacity>
            <Text style={[styles.btn]}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  header: {
    padding: 20,
    marginTop: 40,
  },
  headerText: {
    fontSize: 36,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "#fff",
    textShadowColor: "grey",
    textShadowRadius: 8,
    textShadowOffset: { width: 2, height: 2 },
  },
  buttons: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
  },
  link: {
    flex: 1,
    backgroundColor: Colors.dark,
    margin: 20,
  },
  btn: {
    fontSize: 22,
    fontWeight: "500",
  },
  loginBtn: {
    color: "#fff",
  },
  signupLink: {
    backgroundColor: "#fff",
  },
});
