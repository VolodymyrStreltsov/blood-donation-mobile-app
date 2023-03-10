import React, { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type PageWrapperProps = {
  children: ReactNode
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 56,
    paddingHorizontal: 26,
  },
})
