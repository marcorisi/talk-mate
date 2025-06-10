import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Language } from "@/src/domain";

interface LanguageSelectorsProps {
  speaker1Language: Language;
  speaker2Language: Language;
  currentSpeaker: number;
  onLanguagePress: (speaker: number) => void;
  onToggleSpeaker: () => void;
}

export default function LanguageSelectors({
  speaker1Language,
  speaker2Language,
  currentSpeaker,
  onLanguagePress,
  onToggleSpeaker,
}: LanguageSelectorsProps) {
  return (
    <View style={styles.languageSection}>
      <TouchableOpacity
        style={[styles.languageButton, currentSpeaker === 1 && styles.activeLanguage]}
        onPress={() => onLanguagePress(1)}
      >
        <Text style={styles.flag}>{speaker1Language.flag}</Text>
        <Text style={styles.languageName}>{speaker1Language.name}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.swapButton} onPress={onToggleSpeaker}>
        <Ionicons name="swap-horizontal" size={24} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.languageButton, currentSpeaker === 2 && styles.activeLanguage]}
        onPress={() => onLanguagePress(2)}
      >
        <Text style={styles.flag}>{speaker2Language.flag}</Text>
        <Text style={styles.languageName}>{speaker2Language.name}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  languageSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  languageButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e9ecef",
  },
  activeLanguage: {
    borderColor: "#007bff",
    backgroundColor: "#f0f8ff",
  },
  flag: {
    fontSize: 24,
    marginBottom: 4,
  },
  languageName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#495057",
  },
  swapButton: {
    marginHorizontal: 16,
    padding: 8,
  },
})
