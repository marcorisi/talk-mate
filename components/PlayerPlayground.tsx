import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { useState } from "react";
import { Button, ScrollView, Text, View, StyleSheet } from "react-native";
import { translateText, textToSpeech } from "@/src/openai";
import { colors } from "@/src/colors";
import { useAudioPlayer } from "expo-audio";

function PlayerPlayground() {
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [translation, setTranslation] = useState("À quelle heure est le check-in ?");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const player = useAudioPlayer(audioUri);

  useSpeechRecognitionEvent("start", () => setRecognizing(true));
  useSpeechRecognitionEvent("end", () => setRecognizing(false));
  useSpeechRecognitionEvent("result", (event) => {
    setTranscript(event.results[0]?.transcript);
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error message:", event.message);
  });

  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }
    // Start speech recognition
    ExpoSpeechRecognitionModule.start({
      lang: "it-IT",
      interimResults: true,
      continuous: false,
    });
  };

  const handleVoice = async () => {
    setIsDownloading(true);
    try {
      const audioUri = await textToSpeech(translation, "nova");
      setAudioUri(audioUri);
      setIsDownloading(false);
      player.play();
    } catch (error) {
      setIsDownloading(false);
      console.error("Error generating or playing audio:", error);
    }
  };

  const handleTranslate = () => {
    setIsTranslating(true);
    try {
      translateText(transcript, "italian", "french")
        .then((translatedText) => {
          setTranslation(translatedText);
        })
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setIsTranslating(false);
    };
  }

  return (
    <View style={styles.container}>
      {/* First Area: Speech Recognition */}
      <View style={styles.speechArea}>
        <Text style={styles.areaTitle}>Speech Recognition</Text>

        {!recognizing ? (
          <Button title="Start" onPress={handleStart} />
        ) : (
          <Button
            title="Stop"
            onPress={() => ExpoSpeechRecognitionModule.stop()}
          />
        )}

        <ScrollView style={styles.transcriptContainer}>
          <Text style={styles.transcriptText}>{transcript}</Text>
        </ScrollView>
      </View>

      {/* Second Area: Translation */}
      <View style={styles.translationArea}>
        <Text style={styles.areaTitle}>Translation</Text>

        <Button title="Translate" onPress={handleTranslate} />
        <Button title={isDownloading ? "Downloading..." : "Voice"} onPress={handleVoice} />

        <ScrollView style={styles.translationContainer}>
          <Text style={styles.translationText}>{translation}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
  },
  speechArea: {
    flex: 1,
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    alignItems: 'center',
  },
  translationArea: {
    flex: 1,
    padding: 15,
    backgroundColor: "#e8f4fd",
    borderRadius: 10,
    alignItems: 'center',
  },
  areaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  transcriptContainer: {
    flex: 1,
    width: '80%',
    marginTop: 15,
    padding: 10,
    backgroundColor: colors.background.container,
    borderRadius: 8,
  },
  translationContainer: {
    flex: 1,
    width: '80%',
    marginTop: 15,
    padding: 10,
    backgroundColor: colors.background.container,
    borderRadius: 8,
  },
  transcriptText: {
    fontSize: 16,
    lineHeight: 24,
  },
  translationText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#2c3e50",
  },
});

export default PlayerPlayground;
