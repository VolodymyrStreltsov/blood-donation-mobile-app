import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { DatePicker, Text } from '../../atoms'

export const AddDonationForm = ({ nameOfDonation }: { nameOfDonation: string }) => {
  const [state, onChangeState] = useState<string>(' ')
  const [state1, onChangeState1] = useState<string>(' ')
  const [state2, onChangeState2] = useState<string>(' ')
  return (
    <View>
      <DatePicker />
      <Text variant='h2'>{nameOfDonation}</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.item}
          mode='outlined'
          label='hemoglobin'
          onChangeText={onChangeState}
          value={state}
        />
        <TextInput
          style={styles.item}
          mode='outlined'
          label='hemoglobin'
          onChangeText={onChangeState}
          value={state}
          disabled
        />
        <TextInput
          style={styles.item}
          mode='outlined'
          label='hemoglobin1'
          onChangeText={onChangeState1}
          value={state1}
        />
        <TextInput
          style={styles.item}
          mode='outlined'
          label='hemoglobin2'
          onChangeText={onChangeState2}
          value={state2}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: 10,
    padding: 25,
  },
  item: {
    width: '40%',
  },
})
