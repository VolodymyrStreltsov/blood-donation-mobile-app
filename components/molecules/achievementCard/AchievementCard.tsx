import { Dimensions, Image, Platform, StyleSheet, View } from 'react-native'
import { Card, ProgressBar } from 'react-native-paper'
import { Colors } from '../../../constants/Colors'
import { Text } from '../../atoms'

export const AchievementCard = ({
  title,
  progress,
  remainder,
  img,
}: {
  title: string
  progress: number
  remainder: string
  img: string
}) => {
  const achieved = progress === 1
  return (
    <Card
      theme={{ roundness: 4 }}
      style={[
        styles.card,
        achieved && { backgroundColor: Colors.TintColorLight, borderColor: Colors.TintColorLight },
      ]}>
      <Card.Content style={styles.content}>
        <View style={styles.contentContainer}>
          <Image style={styles.img} source={require('../../../assets/images/icon.png')} />
          <View style={styles.text}>
            <View>
              <Text align='flex-start' bold variant='h4' style={{ marginBottom: 6 }}>
                {title}
              </Text>
              <Text align='flex-start' variant='p'>
                {achieved ? 'Achieved' : `Left: ${remainder} liters`}
              </Text>
            </View>
            <ProgressBar progress={progress} />
          </View>
        </View>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    minHeight: 120,
    width: Platform.OS === 'web' ? 'calc(100vw - 52px)' : Dimensions.get('window').width - 52,
    marginVertical: 8,
    borderColor: '#cac4d0',
    borderWidth: 1,
    boxShadow: 'none',
  },
  content: {
    justifyContent: 'space-between',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 16,
  },
  text: {
    flex: 1,
    justifyContent: 'space-between',
  },
  img: {
    width: 60,
    height: 88,
  },
})
