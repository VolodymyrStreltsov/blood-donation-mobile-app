import React, { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from '../../atoms'

type PageWrapperProps = {
  children: ReactNode
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return <SafeAreaView style={styles.wrapper}><View style={styles.container}>{children}</View></SafeAreaView>
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 56,
    paddingHorizontal: 26,
  },
})
