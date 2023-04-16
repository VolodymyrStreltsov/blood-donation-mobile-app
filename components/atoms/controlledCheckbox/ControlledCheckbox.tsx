import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { Text } from '../text/Text'

interface ControlledCheckboxProps {
  control: Control<any>
  name: string
  disabled?: boolean
}

export const ControlledCheckbox = ({
  name,
  control,
  disabled = false,
}: ControlledCheckboxProps) => {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) =>
        <View style={styles.item}>
          <Checkbox
            status={value ? 'checked' : 'unchecked'}
            disabled={disabled}
            onPress={() => onChange(value ? false : true)}
          />
          <Text>{name}</Text>
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
