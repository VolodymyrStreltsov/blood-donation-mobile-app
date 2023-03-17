import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { TextInput } from 'react-native-paper'
import { StyleProp, ViewStyle } from 'react-native/types'
import { ResultPresentation } from '../resultPresentation/ResultPresentation'

interface DatePickerProps {
  control: Control<any>
  name: string
  style?: StyleProp<ViewStyle>
  disabled?: boolean
}

export const DatePicker = ({
  control,
  name,
  style,
  disabled,
}: DatePickerProps) => {
  const [showPicker, setShowPicker] = useState(false)

  const togglePicker = () => {
    setShowPicker(!showPicker)
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          {disabled ?
            <ResultPresentation label={name} value={new Date(value).toLocaleDateString()} /> :
            <TextInput
              style={style}
              mode='outlined'
              label={name}
              editable={false}
              disabled={disabled}
              value={new Date(value).toLocaleDateString()}
              right={<TextInput.Icon icon='calendar' onPress={!disabled ? togglePicker : () => null} />}
            />}
          {showPicker && (
            <DateTimePicker
              value={new Date(value)}
              mode='date'
              display='default'
              themeVariant='dark'
              maximumDate={new Date()}
              minimumDate={new Date(1990, 0, 1)}
              onChange={(e, val) => {
                togglePicker(),
                  onChange(val)
              }}
            />
          )}
        </>
      )}
    />
  )
}