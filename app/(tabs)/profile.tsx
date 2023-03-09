import React from 'react'
import { PageWrapper, Text } from '../../components'
import { useAuth } from '../../context/auth/AuthProvider'

export default function TabProfileScreen() {
  const { signOut } = useAuth()
  return (
    <PageWrapper>
      <Text onPress={() => signOut()}>Sign Out</Text>
    </PageWrapper>
  )
}
