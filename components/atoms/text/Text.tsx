import React from 'react'
import { StyleSheet, Text as DefaultText } from 'react-native'
import { useThemeColor } from '../../../functions'

export type TextProps = ThemeProps & DefaultText['props'] & {
    variant?: 'h2' | 'h3' | 'h4' | 'h5' | 'p',
    bold?: boolean,
    align?: 'flex-start' | 'center' | 'flex-end'
}

export const Text = (props: TextProps) => {
    const { style, lightColor, darkColor, variant = 'h4', bold, align = 'center', ...otherProps } = props
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

    return <DefaultText style={[{ color }, style, styles[variant], { alignSelf: align, fontWeight: bold ? '500' : '400' }]} {...otherProps} />
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