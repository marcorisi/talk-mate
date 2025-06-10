import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Language } from "@/src/domain"
import Header from "./Header"
import CurrentSpeakerIndicator from "./CurrentSpeakerIndicator"
import LanguageSelectors from "./LanguageSelectors"
import Card from "./Card"

const nationalities: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
]

export default function TranslationApp() {
  const [speaker1Language, setSpeaker1Language] = useState(nationalities[0])
  const [speaker2Language, setSpeaker2Language] = useState(nationalities[1])
  const [currentSpeaker, setCurrentSpeaker] = useState(1)
  const [isRecording, setIsRecording] = useState(false)
  const [transcribedText, setTranscribedText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [showLanguageSelector, setShowLanguageSelector] = useState(null)

  const toggleSpeaker = () => {
    setCurrentSpeaker(currentSpeaker === 1 ? 2 : 1)
    setTranscribedText("")
    setTranslatedText("")
  }

  const startRecording = () => {
    setIsRecording(true)
    setTranscribedText("")
    setTranslatedText("")
    // Mock recording - in real app, this would start speech recognition
  }

  const stopRecording = () => {
    setIsRecording(false)
    // Mock transcription result
    setTranscribedText("This is a sample transcribed text that would appear after recording...")
  }

  const translateText = () => {
    // Mock translation
    setTranslatedText("Este es un texto transcrito de muestra que aparecería después de grabar...")
  }

  const selectLanguage = (language, speaker) => {
    if (speaker === 1) {
      setSpeaker1Language(language)
    } else {
      setSpeaker2Language(language)
    }
    setShowLanguageSelector(null)
  }

  const handleLanguagePress = (speaker) => {
    setShowLanguageSelector(speaker)
  }

  const currentLanguage = currentSpeaker === 1 ? speaker1Language : speaker2Language
  const targetLanguage = currentSpeaker === 1 ? speaker2Language : speaker1Language

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <LanguageSelectors
        speaker1Language={speaker1Language}
        speaker2Language={speaker2Language}
        currentSpeaker={currentSpeaker}
        onLanguagePress={(speaker) => handleLanguagePress(speaker)}
        onToggleSpeaker={toggleSpeaker}
      />

      {/* Current Speaker Indicator */}
      <CurrentSpeakerIndicator currentLanguage={currentLanguage} />

      {/* Text Display Area */}
      <ScrollView style={styles.textContainer} showsVerticalScrollIndicator={false}>
        {!!transcribedText ? (
          <View style={styles.textBlocksContainer}>
            {/* Original Text Block */}
            <Card 
              language={currentLanguage} 
              text={transcribedText} 
            />

            {/* Translated Text Block */}
            {!!translatedText && (
              <Card 
                language={targetLanguage} 
                text={translatedText}
                isTranslated={true} 
              />
            )}
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
            <Ionicons name="mic-outline" size={48} color="#ccc" />
            <Text style={styles.placeholderText}>Tap the microphone to start recording</Text>
          </View>
        )}
      </ScrollView>

      {/* Control Buttons */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.recordButton, isRecording && styles.recordingButton]}
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Ionicons name={isRecording ? "stop" : "mic"} size={32} color="white" />
        </TouchableOpacity>

        {!!transcribedText && !translatedText && (
          <TouchableOpacity style={styles.translateButton} onPress={translateText}>
            <Ionicons name="language" size={24} color="white" />
            <Text style={styles.translateButtonText}>Translate</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Language Selector Modal */}
      {showLanguageSelector && (
        <View style={styles.modalOverlay}>
          <View style={styles.languageSelectorModal}>
            <Text style={styles.modalTitle}>Select Language for Speaker {showLanguageSelector}</Text>
            <ScrollView style={styles.languageList}>
              {nationalities.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={styles.languageOption}
                  onPress={() => selectLanguage(language, showLanguageSelector)}
                >
                  <Text style={styles.flag}>{language.flag}</Text>
                  <Text style={styles.languageOptionText}>{language.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowLanguageSelector(null)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  flag: {
    fontSize: 24,
    marginBottom: 4,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  placeholderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  placeholderText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 16,
  },
  textBlock: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#007bff",
  },
  controlsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#dc3545",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  recordingButton: {
    backgroundColor: "#ff6b6b",
  },
  translateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#28a745",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  translateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  languageSelectorModal: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    width: "90%",
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    color: "#343a40",
  },
  languageList: {
    maxHeight: 300,
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f4",
  },
  languageOptionText: {
    fontSize: 16,
    marginLeft: 12,
    color: "#343a40",
  },
  closeButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  textBlocksContainer: {
    paddingBottom: 20,
  },
})
