import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Language, Speaker } from '@/src/domain'
import { colors } from '@/src/colors'

interface LanguageSelectorModalProps {
  visible: boolean
  speakerNumber: Speaker | null
  languages: Language[]
  onSelectLanguage: (language: Language, speaker: Speaker) => void
  onClose: () => void
}

export default function LanguageSelectorModal({
  visible,
  speakerNumber,
  languages,
  onSelectLanguage,
  onClose,
}: LanguageSelectorModalProps) {
  if (!visible || !speakerNumber) {
    return null
  }

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.languageSelectorModal}>
        <Text style={styles.modalTitle}>Select Language for Speaker {speakerNumber}</Text>
        <ScrollView style={styles.languageList}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={styles.languageOption}
              onPress={() => onSelectLanguage(language, speakerNumber)}
            >
              <Text style={styles.flag}>{language.flag}</Text>
              <Text style={styles.languageOptionText}>{language.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageSelectorModal: {
    backgroundColor: colors.background.container,
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#343a40',
  },
  languageList: {
    maxHeight: 300,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageOptionText: {
    fontSize: 16,
    color: '#343a40',
  },
  closeButton: {
    backgroundColor: colors.background.secondary,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  closeButtonText: {
    color: colors.button.primary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
})
