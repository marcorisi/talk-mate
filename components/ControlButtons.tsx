import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '@/src/colors'

interface ControlButtonsProps {
  isRecording: boolean
  transcribedText: string
  translatedText: string
  isTranslating?: boolean
  onStartRecording: () => void
  onStopRecording: () => void
  onTranslateText: () => void
}

export default function ControlButtons({
  isRecording,
  transcribedText,
  translatedText,
  isTranslating = false,
  onStartRecording,
  onStopRecording,
  onTranslateText,
}: ControlButtonsProps) {
  return (
    <View style={styles.controlsContainer}>
      <TouchableOpacity
        style={[styles.recordButton, isRecording && styles.recordingButton]}
        onPress={isRecording ? onStopRecording : onStartRecording}
        disabled={isTranslating}
      >
        <Ionicons name={isRecording ? "stop" : "mic"} size={32} color={colors.icon.primary} />
      </TouchableOpacity>

      {!!transcribedText && !translatedText && (
        <TouchableOpacity 
          style={[styles.translateButton, isTranslating && styles.translateButtonDisabled]} 
          onPress={onTranslateText}
          disabled={isTranslating}
        >
          {isTranslating ? (
            <ActivityIndicator size="small" color={colors.icon.primary} />
          ) : (
            <Ionicons name="language" size={24} color={colors.icon.primary} />
          )}
          <Text style={styles.translateButtonText}>
            {isTranslating ? "Translating..." : "Translate"}
          </Text>
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
  translateButtonDisabled: {
    backgroundColor: "#6c757d",
  },
  translateButtonText: {
    color: colors.button.primary,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
})
