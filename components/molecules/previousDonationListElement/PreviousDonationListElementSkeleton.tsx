import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

const skeletons = [0, 1, 2, 3, 4, 5, 6]

export const PreviousDonationListElementSkeleton = () => {
  const { colors } = useTheme()

  return (<View style={styles.container}>{
    skeletons.map((el) => <View key={el} style={styles.wrapper}>
      <View style={[styles.round, { backgroundColor: colors.backdrop }]} />
      <View style={[styles.right, { backgroundColor: colors.backdrop }]} />
    </View>)
  }</View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 16,
    height: 72,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '81%',
    height: 40,
    borderRadius: 8,
  },
  round: {
    marginLeft: 8,
    width: 40,
    height: 40,
    borderRadius: 50,
  },
})
