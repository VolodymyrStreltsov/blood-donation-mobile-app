import React from 'react'
import { Text } from '../text/Text'
import { View } from '../view/View'

export const ResultPresentation = ({ label, value }: { label: string, value: string }) => {
  return (
    <View>
      <Text variant='h5' align='flex-start'>{label}</Text>
      <Text variant='h4' align='flex-start'>{value}</Text>
    </View>
  )
}
