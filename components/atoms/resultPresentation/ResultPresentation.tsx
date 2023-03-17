
import { StyleSheet } from 'react-native'
import { Text } from '../text/Text'
import { View } from '../view/View'

export const ResultPresentation = ({ label, value, right }: { label: string, value: string, right?: string }) => {
  return (
    <View style={styles.container}>
      <Text variant='h5' align='flex-start'>{label}</Text>
      <View style={styles.valueContainer}>
        <Text variant='h4' align='flex-start'>{value}</Text>
        <Text variant='h4' align='flex-start' style={{ color: 'gray' }}>{right}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  valueContainer: {
    flexDirection: 'row',
    gap: 8,
  },
})
