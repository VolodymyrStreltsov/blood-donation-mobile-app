import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import React, { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { StyleProp, ViewStyle } from 'react-native/types'
import { DATE_FORMAT } from '../../../constants/Constants'
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
    <View>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            {disabled ?
              <ResultPresentation label={name} value={value?.nativeEvent?.timestamp ? moment(new Date(value.nativeEvent.timestamp)).format(DATE_FORMAT) : moment(new Date(value)).format(DATE_FORMAT)} /> :
              <TextInput
                style={style}
                mode='outlined'
                label={name}
                editable={false}
                disabled={disabled}
                value={value?.nativeEvent?.timestamp ? moment(new Date(value.nativeEvent.timestamp)).format(DATE_FORMAT) : moment(new Date(value)).format(DATE_FORMAT)}
                right={<TextInput.Icon icon='calendar' onPress={!disabled ? togglePicker : () => null} />}
              />}
            {showPicker && (
              <DateTimePicker
                value={value?.nativeEvent?.timestamp ? new Date(value.nativeEvent.timestamp) : new Date(value)}
                mode='date'
                display='default'
                themeVariant='dark'
                onChange={(e) => {
                  togglePicker(),
                    onChange(e)
                }}
              />
            )}
          </>
        )}
      />
    </View>
  )
}