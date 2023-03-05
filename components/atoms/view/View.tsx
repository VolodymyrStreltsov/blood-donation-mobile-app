import { View as DefaultView } from 'react-native'
import { useThemeColor } from '../../../functions'

export type ViewProps = ThemeProps & DefaultView['props']

export const View = (props: ViewProps) => {
    const { style, lightColor, darkColor, ...otherProps } = props
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        'background',
    )

    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}
