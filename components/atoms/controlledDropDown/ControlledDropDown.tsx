import { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import DropDown from 'react-native-paper-dropdown'
import { StyleProp, ViewStyle } from 'react-native/types'
import { CustomTextInput } from '../customTextInput/CustomTextInput'

interface ControlledDropDownProps {
  control: Control<any>
  name: string
  style?: StyleProp<ViewStyle>
  disabled?: boolean
  list: { value: string, label: string }[]
  right?: string
}

export function ControlledDropDown({
  name,
  control,
  style,
  list,
  disabled,
}: ControlledDropDownProps) {
  const [showDropDown, setShowDropDown] = useState(false)
  const { colors } = useTheme()

  const toggleShowDropDown = () => {
    setShowDropDown(!showDropDown)
  }

  return (
    <View style={style}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => disabled ?
          <CustomTextInput value={value} onChange={onChange} label={name} height={56} disabled />
          :
          <DropDown
            label={name}
            mode='outlined'
            activeColor={colors.primary}
            dropDownItemTextStyle={{ color: colors.onSurfaceVariant }}
            visible={showDropDown}
            onDismiss={toggleShowDropDown}
            showDropDown={toggleShowDropDown}
            list={list}
            value={value}
            setValue={onChange}
          />
        }
      />
    </View>
  )
}
