import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface ControlButtonsProps {
  isRecording: boolean
  transcribedText: string
  translatedText: string
  onStartRecording: () => void
  onStopRecording: () => void
  onTranslateText: () => void
}

export default function ControlButtons({
  isRecording,
  transcribedText,
  translatedText,
  onStartRecording,
  onStopRecording,
  onTranslateText,
}: ControlButtonsProps) {
  return (
    <View style={styles.controlsContainer}>
      <TouchableOpacity
        style={[styles.recordButton, isRecording && styles.recordingButton]}
        onPress={isRecording ? onStopRecording : onStartRecording}
      >
        <Ionicons name={isRecording ? "stop" : "mic"} size={32} color="white" />
      </TouchableOpacity>

      {!!transcribedText && !translatedText && (
        <TouchableOpacity style={styles.translateButton} onPress={onTranslateText}>
          <Ionicons name="language" size={24} color="white" />
          <Text style={styles.translateButtonText}>Translate</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
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
})
