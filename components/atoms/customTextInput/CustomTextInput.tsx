import { ReactNode } from 'react'
import { StyleSheet, TextInput as Input, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Text } from '../text/Text'

interface CustomTextInputProps {
  value: string | number
  onChange: () => void
  label: string
  right?: ReactNode
  disabled?: boolean
  calendar?: boolean
  height?: number
}

export const CustomTextInput = ({ value, onChange, label, right, disabled, calendar, height }: CustomTextInputProps) => {
  const { colors } = useTheme()

  return (
    <View style={{ height: height || 48 }}>
      <View style={[styles.label, { backgroundColor: colors.surface }]}>
        <Text variant='h5' style={styles.label_text}>{label}</Text>
      </View>
      <Input
        style={[styles.input, { borderColor: colors.onSurfaceVariant, color: colors.onSurfaceVariant }, disabled && styles.disabled]}
        onChangeText={onChange}
        value={String(value)}
        keyboardType='numeric'
        editable={!disabled && !calendar}
      />
      <View style={[styles.right, calendar && styles.icon]}>
        {right}
      </View>
    </View >
  )
}


const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    top: -15,
    left: 10,
    zIndex: 1,
  },
  label_text: {
    alignSelf: 'flex-start',
    padding: 5
  },
  input: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 14,
  },
  disabled: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 0,
  },
  right: {
    position: 'absolute',
    bottom: 12,
    right: 10,
  },
  icon: {
    bottom: 1,
    right: 3,
  },
})
