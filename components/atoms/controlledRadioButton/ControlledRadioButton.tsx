import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { Text } from '../text/Text'

interface ControlledRadioButtonProps {
  control: Control<any>
  name: string
  disabled?: boolean
  options: { label: string; value: string }[]
}

export const ControlledRadioButton = ({
  name,
  control,
  disabled = false,
  options,
}: ControlledRadioButtonProps) => {

  return (
    <View style={styles.container}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) =>
          <RadioButton.Group
            value={value}
            onValueChange={onChange}
          >
            {options.map((option) => (
              <View
                key={option.value}
                style={styles.item}
              >
                <RadioButton
                  value={option.value}
                  disabled={disabled}
                />
                <Text>{option.label}</Text>
              </View>
            ))
            }
          </RadioButton.Group>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 26,
  },
  item: {
    width: '100%',
    flexDirection: 'row',
  },
})
