import { Ionicons } from "@expo/vector-icons";

export type RoundBtnProps = {
  children?: any;
  icon: typeof Ionicons.defaultProps;
  onPress?: () => void;
};
