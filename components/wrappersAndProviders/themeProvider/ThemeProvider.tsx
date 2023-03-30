import { ReactNode } from 'react'
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper'

import { useColorScheme } from 'react-native'


export const ThemeProvider = (props: { children: ReactNode }) => {
  const theme = useColorScheme() ?? 'light'

  const defaultTheme = theme === 'light' ? MD3LightTheme : MD3DarkTheme

  const colors = {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
    }
  }
  return (
    <PaperProvider theme={colors}>
      {props.children}
    </PaperProvider>
  )
}