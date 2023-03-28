import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

type PageWrapperProps = {
  children: ReactNode
  type?: 'default' | 'modal'
}

export const PageWrapper = ({
  children,
  type = 'default',
}: PageWrapperProps) => {
  const { colors } = useTheme()
  return (
    <SafeAreaView
      style={[
        styles.wrapper,
        { backgroundColor: colors.background, paddingHorizontal: type === 'modal' ? 16 : 26 },
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
