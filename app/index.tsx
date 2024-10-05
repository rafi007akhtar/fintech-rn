import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { defaultStyles } from "../constants/Styles";
import Colors from "../constants/Colors";

export default function Page() {
  const [assets] = useAssets([require("@/assets/videos/intro.mp4")]);

  return (
    <View style={styles.container}>
      {assets && (
        <Video
          source={{ uri: assets[0].uri }}
          style={styles.video}
          isMuted
          isLooping
          shouldPlay
          resizeMode={ResizeMode.COVER}
        />
      )}
      {!assets && <Text>Loading video...</Text>}

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
    marginTop: 80,
    padding: 20,
  },
  headerText: {
    fontSize: 36,
    fontWeight: "900",
    textTransform: "uppercase",
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
