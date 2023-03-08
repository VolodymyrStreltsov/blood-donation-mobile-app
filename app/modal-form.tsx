import { useSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform } from 'react-native'
import { AddDonationForm, PageWrapper } from '../components'

export default function ModalFormScreen() {
    const { name, mode } = useSearchParams()
    const nameOfDonation = typeof name === 'string' ? name : ''

    console.log(name, mode)

    return (
        <PageWrapper>
            <AddDonationForm nameOfDonation={nameOfDonation} />
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </PageWrapper>
    )
}
