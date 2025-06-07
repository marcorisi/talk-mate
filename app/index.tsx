import { View } from "react-native";
import PlayerPlayground from "@/components/PlayerPlayground";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PlayerPlayground />
    </View>
  );
}
