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
  right?: string
}

export function ControlledTextInput({
  name,
  control,
  style,
  disabled,
  right,
}: ControlledTextInputProps) {
  return (
    <View style={style}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) =>
          disabled ? (
            <ResultPresentation label={name} value={value} right={right} />
          ) : (
            <TextInput
              error={error ? true : false}
              mode='outlined'
              outlineStyle={{ borderColor: error ? 'red' : 'gray' }}
              label={name}
              onChangeText={onChange}
              value={String(value)}
              right={<TextInput.Affix text={right} />}
              keyboardType='numeric'
            />
          )
        }
      />
    </View>
  )
}
