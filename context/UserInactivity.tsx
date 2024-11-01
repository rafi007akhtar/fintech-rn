import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV({
  id: "inactivity-storage",
});

const ON_BACKGROUND_SINCE = "onBackgroundSince";
const LOCK_THRESHOLD_MS = 10000;

export function UserInactivityProvider({ children }: any) {
  const appState = useRef(AppState.currentState);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  async function handleAppStateChange(nextAppState: AppStateStatus) {
    const onBackgroundSince = storage.getNumber(ON_BACKGROUND_SINCE) || 0;

    if (nextAppState === "background") {
      storage.set(ON_BACKGROUND_SINCE, Date.now());
    } else if (
      nextAppState === "active" &&
      appState.current.match(/background/)
    ) {
      const elapsedTime = Date.now() - onBackgroundSince;

      if (elapsedTime > LOCK_THRESHOLD_MS && isSignedIn) {
        router.replace("/(authenticated)/(modals)/lock");
      }
    }
    appState.current = nextAppState;
  }

  return children;
}
