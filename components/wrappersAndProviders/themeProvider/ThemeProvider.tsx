import { ReactNode, useEffect, useState } from 'react'
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper'

import { useColorScheme } from 'react-native'
import { getSettings } from '../../../data/settings'
import { useChangeContext } from '../changeContextProvider/createContext'


export const ThemeProvider = (props: { children: ReactNode }) => {
  const { settingsChanged } = useChangeContext()
  const theme = useColorScheme() ?? 'light'
  const [defaultTheme, setDefaultTheme] = useState(theme === 'light' ? MD3LightTheme : MD3DarkTheme)

  const setTheme = async () => {
    const storedMode = await getSettings().then((settings) => settings?.mode)
    if (storedMode) {
      setDefaultTheme(storedMode === 'light' ? MD3LightTheme : MD3DarkTheme)
    } else {
      setDefaultTheme(theme === 'light' ? MD3LightTheme : MD3DarkTheme)
    }
  }

  useEffect(() => {
    setTheme()
  }, [settingsChanged])

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