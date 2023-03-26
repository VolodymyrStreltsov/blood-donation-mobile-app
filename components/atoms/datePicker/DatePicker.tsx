import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { IconButton } from 'react-native-paper'
import { StyleProp, ViewStyle } from 'react-native/types'
import { formattingDate } from '../../../functions'
import { CustomTextInput } from '../customTextInput/CustomTextInput'
import { View } from '../view/View'

interface DatePickerProps {
  control: Control<any>
  name: string
  style?: StyleProp<ViewStyle>
  disabled?: boolean
}

export const DatePicker = ({ control, name, style, disabled }: DatePickerProps) => {
  const [showPicker, setShowPicker] = useState(false)

  const togglePicker = () => {
    setShowPicker(!showPicker)
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <View style={style}>
          <CustomTextInput
            disabled={disabled}
            label={name}
            onChange={onChange}
            value={formattingDate(value)}
            right={<IconButton size={17} icon='calendar' onPress={!disabled ? togglePicker : () => null} />}
            calendar
          />
          {showPicker && (
            <DateTimePicker
              value={new Date(value)}
              mode='date'
              display='default'
              themeVariant='dark'
              maximumDate={new Date()}
              minimumDate={new Date(1990, 0, 1)}
              onChange={(e, val) => {
                togglePicker(), onChange(val)
              }}
            />
          )}
        </View>
      )}
    />
  )
}
