import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useAudioPlayer } from 'expo-audio';
import IsPlayingCardFooter from './IsPlayingCardFooter';
import { textToSpeech } from '@/src/openai';

import { Language } from '@/src/domain';
import { colors } from '@/src/colors';

interface CardProps {
    language: Language;
    text?: string;
    isTranslated?: boolean;
}

export default function Card({ language, text, isTranslated = false }: CardProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [audioUri, setAudioUri] = useState<string | null>(null);
    const player = useAudioPlayer(audioUri);

    const textLabel = isTranslated ? "Translation" : "Original";

    const stop = async () => {
        try {
            await player.pause();
            setIsPlaying(false);
        } catch (error) {
            console.error("Error stopping audio:", error);
            setIsPlaying(false);
        }
    };

    const play = async () => {
        if (!text?.trim()) {
            Alert.alert("Error", "No text to play");
            return;
        }

        setIsLoading(true);
        try {
            const voice = "nova"
            const uri = await textToSpeech(text, voice);
            setAudioUri(uri);
            setIsLoading(false);
            setIsPlaying(true);
            
            player.play();
            
            // Listen for when audio finishes playing
            // Note: You might need to add event listeners to detect when audio ends
            // For now, we'll use a simple timeout based on estimated reading time
            const estimatedDuration = Math.max(text.length * 100, 2000); // Rough estimate
            setTimeout(() => {
                setIsPlaying(false);
            }, estimatedDuration);
            
        } catch (error) {
            console.error("Error playing audio:", error);
            Alert.alert("Error", "Failed to play audio");
            setIsLoading(false);
            setIsPlaying(false);
        }
    };

    const handlePress = () => {
        if (isPlaying) {
            stop();
        } else if (!isLoading) {
            play();
        }
    };

    const getButtonIcon = () => {
        if (isLoading) return "hourglass";
        if (isPlaying) return "volume-mute";
        return "volume-high";
    };

    const getButtonColor = () => {
        if (isLoading) return "#f59e0b";
        if (isPlaying) return isTranslated ? "#10b981" : "#3b82f6";
        return "#6b7280";
    };

    return (
        <View style={[styles.textBlock, isTranslated ? styles.translatedTextBlock : styles.originalTextBlock]}>
            <View style={styles.textBlockHeader}>
                <Text style={styles.textLabel}>{textLabel} ({language.name})</Text>
                <TouchableOpacity
                    style={[
                        styles.speakerButton,
                        isLoading 
                            ? styles.speakerButtonLoading
                            : isPlaying 
                                ? (isTranslated ? styles.speakerButtonActiveGreen : styles.speakerButtonActive)
                                : styles.speakerButtonInactive,
                    ]}
                    onPress={handlePress}
                    activeOpacity={0.7}
                    disabled={!text?.trim()}
                >
                    <Ionicons
                        name={getButtonIcon()}
                        size={16}
                        color={getButtonColor()}
                    />
                </TouchableOpacity>
            </View>
            <Text style={isTranslated ? styles.translatedText : styles.transcribedText}>{text}</Text>
            {(isPlaying || isLoading) && <IsPlayingCardFooter isTranslated={isTranslated} />}
        </View>
    );
}

const styles = StyleSheet.create({
  textBlock: {
    backgroundColor: colors.background.container,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent.primary,
  },
  originalTextBlock: {
    borderLeftWidth: 4,
    borderLeftColor: colors.accent.primary,
  },
  translatedTextBlock: {
    borderLeftWidth: 4,
    borderLeftColor: colors.accent.secondary,
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
  speakerButtonLoading: {
    backgroundColor: "#fef3c7",
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
});
