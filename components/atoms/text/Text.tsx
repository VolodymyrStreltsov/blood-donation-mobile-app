import { StyleSheet, Text as DefaultText } from 'react-native'
import { useTheme } from 'react-native-paper'

export type TextProps =
  DefaultText['props'] & {
    variant?: 'h2' | 'h3' | 'h4' | 'h5' | 'p'
    bold?: boolean
    align?: 'flex-start' | 'center' | 'flex-end'
  }

export const Text = (props: TextProps) => {
  const { colors } = useTheme()
  const {
    style,
    variant = 'h4',
    bold,
    align = 'center',
    ...otherProps
  } = props

  return (
    <DefaultText
      style={[
        style,
        styles[variant],
        { color: colors.onSurfaceVariant, alignSelf: align, fontWeight: bold ? '500' : '400' },
      ]}
      {...otherProps}
    />
  )
}

const styles = StyleSheet.create({
  h2: {
    fontSize: 28,
  },
  h3: {
    fontSize: 22,
  },
  h4: {
    fontSize: 16,
  },
  h5: {
    fontSize: 12,
  },
  p: {
    fontSize: 14,
  },
})
