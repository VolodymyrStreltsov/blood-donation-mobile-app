import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from '../text/Text'
import { View } from '../view/View'

export const ResultPresentation = ({ label, value }: { label: string, value: string }) => {
  return (
    <View style={styles.container}>
      <Text variant='h5' align='flex-start'>{label}</Text>
      <Text variant='h4' align='flex-start'>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
})
