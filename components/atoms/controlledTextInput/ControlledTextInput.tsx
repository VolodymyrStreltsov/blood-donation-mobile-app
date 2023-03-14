import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { TextInput } from 'react-native-paper'
import { StyleProp, ViewStyle } from 'react-native/types'
import { ResultPresentation } from '../resultPresentation/ResultPresentation'
import { View } from '../view/View'

interface ControlledTextInputProps {
  control: Control<any>
  name: string
  style?: StyleProp<ViewStyle>
  disabled?: boolean
}

export function ControlledTextInput({ name, control, style, disabled }: ControlledTextInputProps) {
  return (
    <View style={style}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          disabled ?
            <ResultPresentation label={name} value={value} />
            : <TextInput
              error={error ? true : false}
              mode='outlined'
              label={name}
              onChangeText={onChange}
              value={value}
            />
        )}
      />
    </View>)
}
