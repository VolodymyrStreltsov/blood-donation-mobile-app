import { Dimensions, StyleSheet, View } from 'react-native'
import { Card } from 'react-native-paper'

const skeletons = [0, 1, 2]

export const NextDonationCardSkeleton = () => {
  return (<View style={styles.container}>{
    skeletons.map((el) => <Card key={el} style={styles.card} theme={{ roundness: 4 }}>{ }</Card>)
  }</View>)
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    marginLeft: 33,
  },
  card: {
    width: 150,
    height: 150,
    margin: 7,
    boxShadow: 'none',
  },
})


