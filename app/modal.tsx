import { useSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform } from 'react-native'
import { DonationForm, PageWrapper } from '../components'

export default function ModalScreen() {
  const { name, id } = useSearchParams()
  const nameOfDonation = typeof name === 'string' ? name : ''
  const idOfDonation = typeof id === 'string' ? id : ''

  return (
    <PageWrapper type='modal'>
      <DonationForm nameOfDonation={nameOfDonation} id={idOfDonation} />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </PageWrapper>
  )
}
