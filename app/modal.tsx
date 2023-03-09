import { useSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform, View } from 'react-native'
import { AddDonationForm, PageWrapper } from '../components'

export default function ModalScreen() {
  const { name, mode } = useSearchParams()
  const nameOfDonation = typeof name === 'string' ? name : ''

  return (
    <PageWrapper>
      <View>{mode}</View>
      <AddDonationForm nameOfDonation={nameOfDonation} />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </PageWrapper>
  )
}
