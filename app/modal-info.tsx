import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform } from 'react-native'
import { PageWrapper, Text } from '../components'

export default function ModalInfoScreen() {
    return (
        <PageWrapper>
            <Text>Info</Text>
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </PageWrapper>
    )
}
