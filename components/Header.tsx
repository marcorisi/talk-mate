import { View, Text, StyleSheet } from "react-native"

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Talk Mate</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#343a40",
  },
})
