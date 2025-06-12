import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Language, Speaker } from "@/src/domain"
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition"
import { translateText as translateTextAPI } from "@/src/openai"
import Header from "./Header"
import CurrentSpeakerIndicator from "./CurrentSpeakerIndicator"
import LanguageSelectors from "./LanguageSelectors"
import Card from "./Card"
import LanguageSelectorModal from "./LanguageSelectorModal"
import ControlButtons from "./ControlButtons"

const languages: Language[] = [
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
]

// Language code mapping for speech recognition
const speechLanguageCodes: Record<string, string> = {
  it: "it-IT",
  fr: "fr-FR", 
  en: "en-US",
  es: "es-ES",
  de: "de-DE",
  pt: "pt-PT",
  ru: "ru-RU",
  ja: "ja-JP",
  ko: "ko-KR",
  zh: "zh-CN",
}

export default function TranslationApp() {
  const [speaker1Language, setSpeaker1Language] = useState(languages[0])
  const [speaker2Language, setSpeaker2Language] = useState(languages[1])
  const [currentSpeaker, setCurrentSpeaker] = useState<Speaker>(1)
  const [isRecording, setIsRecording] = useState(false)
  const [transcribedText, setTranscribedText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [showLanguageSelector, setShowLanguageSelector] = useState<null | Speaker>(null)
  const [isTranslating, setIsTranslating] = useState(false)

  // Speech recognition event handlers
  useSpeechRecognitionEvent("start", () => setIsRecording(true))
  useSpeechRecognitionEvent("end", () => setIsRecording(false))
  useSpeechRecognitionEvent("result", (event) => {
    setTranscribedText(event.results[0]?.transcript || "")
  })
  useSpeechRecognitionEvent("error", (event) => {
    console.log("Speech recognition error:", event.error, event.message)
    setIsRecording(false)
  })

  const toggleSpeaker = () => {
    setCurrentSpeaker(currentSpeaker === 1 ? 2 : 1)
    setTranscribedText("")
    setTranslatedText("")
  }

  const startRecording = async () => {
    try {
      const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync()
      if (!result.granted) {
        console.warn("Speech recognition permissions not granted", result)
        return
      }

      const currentLanguage = currentSpeaker === 1 ? speaker1Language : speaker2Language
      const langCode = speechLanguageCodes[currentLanguage.code] || "en-US"

      setTranscribedText("")
      setTranslatedText("")

      ExpoSpeechRecognitionModule.start({
        lang: langCode,
        interimResults: true,
        continuous: false,
      })
    } catch (error) {
      console.error("Error starting speech recognition:", error)
    }
  }

  const stopRecording = () => {
    ExpoSpeechRecognitionModule.stop()
  }

  const translateText = async () => {
    if (!transcribedText.trim()) return

    setIsTranslating(true)
    try {
      const currentLanguage = currentSpeaker === 1 ? speaker1Language : speaker2Language
      const targetLanguage = currentSpeaker === 1 ? speaker2Language : speaker1Language
      
      const translated = await translateTextAPI(
        transcribedText,
        currentLanguage.code,
        targetLanguage.code
      )
      setTranslatedText(translated)
    } catch (error) {
      console.error("Translation error:", error)
    } finally {
      setIsTranslating(false)
    }
  }

  const selectLanguage = (language: Language, speaker: Speaker) => {
    if (speaker === 1) {
      setSpeaker1Language(language)
    } else {
      setSpeaker2Language(language)
    }
    setShowLanguageSelector(null)
  }

  const handleLanguagePress = (speaker: Speaker) => {
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
      <ControlButtons
        isRecording={isRecording}
        transcribedText={transcribedText}
        translatedText={translatedText}
        isTranslating={isTranslating}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        onTranslateText={translateText}
      />

      {/* Language Selector Modal */}
      <LanguageSelectorModal
        visible={!!showLanguageSelector}
        speakerNumber={showLanguageSelector}
        languages={languages}
        onSelectLanguage={selectLanguage}
        onClose={() => setShowLanguageSelector(null)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
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
  textBlocksContainer: {
    paddingBottom: 20,
  },
})
