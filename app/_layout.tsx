// import { Stack } from "expo-router";
// 
// export default function RootLayout() {
//   return <Stack />;
// }

// import { View } from "react-native";
// import PlayerPlayground from "@/components/PlayerPlayground";
import TranslationApp from "@/components/v0app";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <TranslationApp />
      </SafeAreaView>
    </SafeAreaProvider>
    
  );
}
