import { ReactNode } from 'react'
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
}


export const ThemeProvider = (props: { children: ReactNode }) => {
  return (
    <PaperProvider theme={theme}>
      {props.children}
    </PaperProvider>
  )
}