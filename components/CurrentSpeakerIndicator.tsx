import { View, Text, StyleSheet } from 'react-native';

interface Language {
  name: string;
  flag: string;
  code: string;
}

interface CurrentSpeakerIndicatorProps {
  currentLanguage: Language;
}

export default function CurrentSpeakerIndicator({ currentLanguage }: CurrentSpeakerIndicatorProps) {
  return (
    <View style={styles.speakerIndicator}>
      <Text style={styles.speakerText}>
        Speaking: {currentLanguage.flag} {currentLanguage.name}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  speakerIndicator: {
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#e3f2fd",
    marginHorizontal: 20,
    borderRadius: 8,
  },
  speakerText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1976d2",
  },
});
