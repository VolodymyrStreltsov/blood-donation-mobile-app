import { ReactNode } from 'react'
import { StyleSheet, TextInput as Input } from 'react-native'
import { Text } from '../text/Text'
import { View } from '../view/View'

interface CustomTextInputProps {
  value: string | number
  onChange: () => void
  label: string
  right?: ReactNode
  disabled?: boolean
  calendar?: boolean
}

export const CustomTextInput = ({ value, onChange, label, right, disabled, calendar }: CustomTextInputProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text variant='h5' style={styles.label_text}>{label}</Text>
      </View>
      <Input
        style={[styles.input, disabled && styles.disabled]}
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
  container: {
    height: 48,
  },
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
    borderColor: 'gray',
    color: 'white'
  },
  disabled: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 0,
  },
  right: {
    position: 'absolute',
    bottom: 12,
    right: 10,
    color: 'gray'
  },
  icon: {
    bottom: 1,
    right: 1,
  },
})
