import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { DatePickerModal, enGB, registerTranslation } from 'react-native-paper-dates'
import { SafeAreaProvider } from 'react-native-safe-area-context'
registerTranslation('en-GB', enGB)

export function DatePicker() {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const onDismissSingle = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const onConfirmSingle = useCallback(
    (params: any) => {
      setOpen(false)
      setDate(params.date)
    },
    [setOpen, setDate],
  )

  return (
    <SafeAreaProvider>
      <View style={{ justifyContent: 'center', flex: 0.5, alignItems: 'center' }}>
        <Button onPress={() => setOpen(true)} uppercase={false} mode='outlined'>
          {date.toDateString()}
        </Button>
        <DatePickerModal
          animationType='slide'
          label='Select date'
          locale='en-GB'
          mode='single'
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
          startYear={1990}
          endYear={2049}
        />
      </View>
    </SafeAreaProvider>
  )
}
