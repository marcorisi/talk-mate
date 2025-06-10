import { View, Text, StyleSheet } from 'react-native';

interface IsPlayingCardFooterProps {
    isTranslated?: boolean;
}

export default function IsPlayingCardFooter({ isTranslated = false }: IsPlayingCardFooterProps) {
  return (
    <View style={styles.playingIndicator}>
        <View style={styles.soundWave}>
        <View style={[styles.soundBar, isTranslated ? styles.soundBarGreen1 : styles.soundBar2]} />
        <View style={[styles.soundBar, isTranslated ? styles.soundBarGreen2 : styles.soundBar1]} />
        <View style={[styles.soundBar, isTranslated ? styles.soundBarGreen3 : styles.soundBar3]} />
        <View style={[styles.soundBar, isTranslated ? styles.soundBarGreen4 : styles.soundBar4]} />
        </View>
        <Text style={isTranslated ? styles.playingTextGreen : styles.playingText}>Playing...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  soundBar: {
    width: 2,
    borderRadius: 1,
    marginHorizontal: 1,
  },
  soundBar1: {
    height: 12,
    backgroundColor: "#3b82f6",
  },
  soundBar2: {
    height: 16,
    backgroundColor: "#3b82f6",
  },
  soundBar3: {
    height: 8,
    backgroundColor: "#3b82f6",
  },
  soundBar4: {
    height: 12,
    backgroundColor: "#3b82f6",
  },
  soundBarGreen1: {
    height: 12,
    backgroundColor: "#10b981",
  },
  soundBarGreen2: {
    height: 16,
    backgroundColor: "#10b981",
  },
  soundBarGreen3: {
    height: 8,
    backgroundColor: "#10b981",
  },
  soundBarGreen4: {
    height: 12,
    backgroundColor: "#10b981",
  },
  soundWave: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  playingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  playingText: {
    fontSize: 12,
    color: "#3b82f6",
    fontWeight: "500",
  },
  playingTextGreen: {
    fontSize: 12,
    color: "#10b981",
    fontWeight: "500",
  },
});
