import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Link, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import Colors from "../constants/Colors";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { TokenCache } from "@clerk/clerk-expo/dist/cache/types";
import { ClerkProvider, useAuth, useSession } from "@clerk/clerk-expo";
import { verification } from "../constants/Verification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

const tokenCache: TokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!; // NOTE: the ! is needed to establish that the key is set
if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export function Loading() {
  return <Text>Loading ...</Text>;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <Loading />;
  }

  return <RootLayoutNav />;
}

function InitalLayout() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();
  const userSession = useSession();

  useEffect(() => {
    console.log("currently on:", segments);
  }, [segments]);

  useEffect(() => {
    console.log("isSignedIn: ", isSignedIn);
    console.log("segments", segments);

    const inAuthGroup = segments[0] === "(authenticated)";
    const inRootLayout = segments[0] === "";

    try {
      console.log({ isSignedIn, inAuthGroup, inRootLayout });
      if (isSignedIn && !inAuthGroup && !inRootLayout) {
        // router.replace<any>("/(authenticated)/(tabs)/home"); // TODO: uncomment after doing other navs
        router.replace<any>("/(authenticated)/(tabs)/crypto"); // TODO: delete once this nav is done
      } else if (!isSignedIn) {
        router.replace("/");
      }
    } catch (e: any) {
      console.warn(e.toString());
    }

    return () => {
      if (verification.REMOVE_SESSION_ON_EXIT) {
        userSession.session?.remove();
      }
    };
  }, [isSignedIn]);

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="[phone]" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerRight: () => (
            <Link href="/help" asChild>
              <TouchableOpacity>
                <Ionicons
                  name="help-circle-outline"
                  size={34}
                  color={Colors.dark}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="help"
        options={{
          title: "Help",
          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="(authenticated)/(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(authenticated)/crypto/[id]"
        options={{
          title: "",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}

function RootLayoutNav() {
  return (
    <>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <QueryClientProvider client={client}>
          <StatusBar style="light" />
          <InitalLayout />
        </QueryClientProvider>
      </ClerkProvider>
    </>
  );
}
