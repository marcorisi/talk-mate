// import { Stack } from "expo-router";
// 
// export default function RootLayout() {
//   return <Stack />;
// }

// import { View } from "react-native";
// import PlayerPlayground from "@/components/PlayerPlayground";
import TranslationApp from "@/components/v0app";

export default function Index() {
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <PlayerPlayground />
    // </View>
    <TranslationApp />
  );
}
