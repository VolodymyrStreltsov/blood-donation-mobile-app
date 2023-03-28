import { StyleSheet, View } from 'react-native'
import { Card, useTheme } from 'react-native-paper'
import { Text } from '../../atoms'

export const InfoDateCard = ({
  title,
  date,
  width = '45%',
  color,
  withBorder,
}: {
  title: string
  date: string
  width?: string
  color?: string
  withBorder?: boolean
}) => {
  const { colors } = useTheme()

  return (
    <Card
      style={[
        styles.card,
        { width: width, backgroundColor: color ?? colors.background, borderColor: withBorder ? colors.background : color },
      ]}
      theme={{ roundness: 4 }}>
      <Card.Content style={styles.content}>
        <View style={styles.text}>
          <Text align='flex-start' bold variant='h4'>
            {title}
          </Text>
          <Text align='flex-start' variant='p'>
            {date}
          </Text>
        </View>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    height: 80,
    margin: 7,
    borderWidth: 1,
    boxShadow: 'none',
  },
  content: {
    justifyContent: 'space-between',
  },
  text: {
    justifyContent: 'space-between',
  },
})
