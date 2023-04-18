import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper'
import { getSettings } from '../../../data/settings'
import { useChangeContext } from '../changeContextProvider/createContext'

export const ThemeProvider = (props: { children: ReactNode }) => {
  const { settingsChanged } = useChangeContext()
  const systemTheme = useColorScheme() ?? 'light'
  const [defaultTheme, setDefaultTheme] = useState(systemTheme === 'light' ? MD3LightTheme : MD3DarkTheme)

  useEffect(() => {
    (async () => {
      const storedMode = await getSettings().then((settings) => settings?.mode)
      if (storedMode) {
        setDefaultTheme(storedMode === 'light' ? MD3LightTheme : MD3DarkTheme)
      }
    })()
  }, [settingsChanged])

  const colors = useMemo(() => ({
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
    },
  }), [defaultTheme])

  return (
    <PaperProvider theme={colors}>
      {props.children}
    </PaperProvider>
  )
}