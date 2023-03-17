import { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import DropDown from 'react-native-paper-dropdown'
import { StyleProp, ViewStyle } from 'react-native/types'
import { ResultPresentation } from '../resultPresentation/ResultPresentation'
import { View } from '../view/View'

interface ControlledDropDownProps {
  control: Control<any>
  name: string
  style?: StyleProp<ViewStyle>
  disabled?: boolean
  list: DropdownType[]
}

export function ControlledDropDown({ name, control, style, disabled, list }: ControlledDropDownProps) {
  const [showDropDown, setShowDropDown] = useState(false)

  const toggleShowDropDown = () => {
    setShowDropDown(!showDropDown)
  }

  return (
    <View style={style}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          disabled ?
            <ResultPresentation label={name} value={value} />
            : <DropDown
              label={name}
              mode='outlined'
              visible={showDropDown}
              onDismiss={toggleShowDropDown}
              showDropDown={toggleShowDropDown}
              list={list}
              value={value}
              setValue={onChange}
            />
        )}
      />
    </View>)
}
