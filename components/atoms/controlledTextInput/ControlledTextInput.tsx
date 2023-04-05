import { Control, Controller } from 'react-hook-form'
import { View } from 'react-native'
import { StyleProp, ViewStyle } from 'react-native/types'
import { CustomTextInput } from '../customTextInput/CustomTextInput'
import { Text } from '../text/Text'

interface ControlledTextInputProps {
  control: Control<any>
  name: string
  style?: StyleProp<ViewStyle>
  disabled?: boolean
  right?: string
}

export const ControlledTextInput = ({
  name,
  control,
  style,
  disabled = false,
  right = '',
}: ControlledTextInputProps) =>
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) =>
      <View style={[style, { display: disabled && !value ? 'none' : 'flex' }]}>
        <CustomTextInput
          disabled={disabled}
          label={name}
          onChange={onChange}
          value={String(value)}
          right={<Text variant='h4' style={{ color: 'grey' }}>{right}</Text>}
        />
      </View>
    }
  />

