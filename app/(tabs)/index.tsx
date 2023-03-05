import React from 'react'
import { MenuFAB, PageWrapper, Text } from '../../components'
import { useAuth } from '../../context'

export default function TabOneScreen() {
    const { user } = useAuth()
    return (
        <PageWrapper>
            <Text>Hello {user?.name}</Text>
            <Text>Your donations here</Text>
            <MenuFAB />
        </PageWrapper>
    )
}
