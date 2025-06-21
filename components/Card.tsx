import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import IsPlayingCardFooter from './IsPlayingCardFooter';
import { textToSpeech } from '@/src/openai';
import { logger } from '@/src/utils';

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
    const [textToPlay, setTextToPlay] = useState<string>(text || '');
    const [cachedText, setCachedText] = useState<string>(textToPlay || ''); // Track what text was used for current audio
    const [shouldPlayAfterLoad, setShouldPlayAfterLoad] = useState(false);
    const player = useAudioPlayer(audioUri);
    const playerStatus = useAudioPlayerStatus(player);

    const textLabel = isTranslated ? "Translation" : "Original";

    // Effect to play audio once it's loaded
    useEffect(() => {
        if (audioUri && shouldPlayAfterLoad) {
            const playAudio = async () => {
                try {
                    // Small delay to ensure audio is fully loaded
                    await new Promise(resolve => setTimeout(resolve, 100));
                    player.play();
                    setIsPlaying(true);
                    setShouldPlayAfterLoad(false);
                } catch (error) {
                    console.error("Error playing audio:", error);
                    setIsPlaying(false);
                    setShouldPlayAfterLoad(false);
                }
            };
            
            playAudio();
        }
    }, [audioUri, shouldPlayAfterLoad]);

    useEffect(() => {
        if (playerStatus.playing) {
            setIsPlaying(true);
            logger.log("Player status changed: Audio is playing");
        } else {
            setIsPlaying(false);
            logger.log("Audio is paused or stopped");
        }
    }, [playerStatus.playing]);

    
    if (text !== cachedText && cachedText !== '') {
        logger.log("Text changed, clearing cached audio");
        setAudioUri(null);
        setCachedText('');
    }

    const stop = async () => {
        try {
            player.pause();
            setIsPlaying(false);
            setShouldPlayAfterLoad(false);
        } catch (error) {
            console.error("Error stopping audio:", error);
            setIsPlaying(false);
            setShouldPlayAfterLoad(false);
        }
    };

    const play = async () => {
        if (!text?.trim()) {
            Alert.alert("Error", "No text to play");
            return;
        }

        // Check if we already have audio for this exact text
        if (audioUri && cachedText === text) {
            logger.log("Using cached audio for same text");
            try {
                player.play();
                setIsPlaying(true);
                return;
            } catch (error) {
                console.error("Error playing cached audio:", error);
                // If cached audio fails, fall through to generate new audio
                setAudioUri(null);
                setCachedText('');
            }
        }

        // Generate new audio only if text is different or no cached audio exists
        logger.log("Generating new audio for text:", text);
        setIsLoading(true);
        try {
            const voice = "nova";
            const uri = await textToSpeech(text, voice);
            setAudioUri(uri);
            setCachedText(text); // Cache the text used for this audio
            setShouldPlayAfterLoad(true);
            setIsLoading(false);
        } catch (error) {
            console.error("Error generating audio:", error);
            Alert.alert("Error", "Failed to generate audio");
            setIsLoading(false);
            setIsPlaying(false);
            setShouldPlayAfterLoad(false);
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
            {isPlaying && <IsPlayingCardFooter isTranslated={isTranslated} />}
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
