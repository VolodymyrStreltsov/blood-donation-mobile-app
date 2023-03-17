import { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeColor } from '../../../functions'
import { View } from '../../atoms'

type PageWrapperProps = {
  children: ReactNode
  type?: 'default' | 'modal'
  lightColor?: string
  darkColor?: string
}

export const PageWrapper = ({
  children,
  type = 'default',
  lightColor,
  darkColor,
}: PageWrapperProps) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')
  return (
    <SafeAreaView
      style={[
        styles.wrapper,
        { paddingHorizontal: type === 'modal' ? 16 : 26 },
        { backgroundColor },
      ]}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
  },
})
