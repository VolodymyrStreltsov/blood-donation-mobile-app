import { StyleSheet } from 'react-native'
import { EditScreenInfo, MenuFAB, Text, View } from '../../components'

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donations</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <MenuFAB />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
