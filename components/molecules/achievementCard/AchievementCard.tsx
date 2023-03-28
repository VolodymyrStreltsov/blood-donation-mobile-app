import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { Card, ProgressBar, useTheme } from 'react-native-paper'
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
  img: number
}) => {
  const achieved = progress >= 1
  const { colors } = useTheme()

  return (
    <Card
      theme={{ roundness: 4 }}
      style={[
        styles.card,
        achieved ? { backgroundColor: colors.primaryContainer, borderColor: colors.primaryContainer } :
          { backgroundColor: colors.background, borderColor: colors.outlineVariant }
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
    width: Dimensions.get('window').width - 52,
    marginVertical: 8,
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
