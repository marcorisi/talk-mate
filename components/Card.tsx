import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import IsPlayingCardFooter from './IsPlayingCardFooter';

import { Language } from '@/src/domain';
import { colors } from '@/src/colors';

interface CardProps {
    language: Language;
    text?: string;
    isTranslated?: boolean;
}

export default function Card({ language, text, isTranslated = false }: CardProps) {

    const [isPlaying, setIsPlaying] = useState(false)

    const textLabel = isTranslated ? "Translation" : "Original";

    const stop = () => {
        setIsPlaying(false)
        // Mock stopping - in real app, this would stop text-to-speech
    }

    const play = () => {
        setIsPlaying(true)
        setTimeout(() => setIsPlaying(false), 1500)
        // Mock playing - in real app, this would use text-to-speech
    }

    return (
        
        <View style={[styles.textBlock, isTranslated ? styles.translatedTextBlock : styles.originalTextBlock]}>
            <View style={styles.textBlockHeader}>
            <Text style={styles.textLabel}>{textLabel} ({language.name})</Text>
            <TouchableOpacity
                style={[
                styles.speakerButton,
                isPlaying 
                    ? (isTranslated ? styles.speakerButtonActiveGreen : styles.speakerButtonActive)
                    : styles.speakerButtonInactive,
                ]}
                onPress={isPlaying ? stop : play}
                activeOpacity={0.7}
            >
                <Ionicons
                    name={isPlaying ? "volume-mute" : "volume-high"}
                    size={16}
                    color={isPlaying ? isTranslated ? "#10b981" : "#3b82f6" : "#6b7280"}
                />
            </TouchableOpacity>
            </View>
            <Text style={isTranslated ? styles.translatedText : styles.transcribedText}>{text}</Text>
            {isPlaying && <IsPlayingCardFooter isTranslated={isTranslated} />}
        </View>
    )
}

const styles = StyleSheet.create({
  textBlock: {
    backgroundColor: colors.background.container,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#007bff",
  },
  originalTextBlock: {
    borderLeftWidth: 4,
    borderLeftColor: "#007bff",
  },
  translatedTextBlock: {
    borderLeftWidth: 4,
    borderLeftColor: "#28a745",
  },
  textBlockHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  textLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text.secondary,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  speakerButton: {
    padding: 8,
    borderRadius: 20,
  },
  speakerButtonInactive: {
    backgroundColor: "#f1f3f4",
  },
  speakerButtonActive: {
    backgroundColor: "#dbeafe",
  },
  speakerButtonActiveGreen: {
    backgroundColor: "#dcfce7",
  },
  transcribedText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#343a40",
  },
translatedText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#343a40",
  },
})
