import { useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { Card, useTheme } from 'react-native-paper'
import { Text } from '../../atoms'

export const InfoDateCard = ({
  title,
  date,
  width = '45%',
  color,
  withBorder,
  prev,
}: {
  title: string
  date: string
  width?: string
  color?: string
  withBorder?: boolean
  prev?: { id?: string, type: string }
}) => {
  const router = useRouter()
  const { colors } = useTheme()

  return (
    <Card
      onPress={() => {
        prev?.id &&
          router.push({
            pathname: 'modal',
            params: { name: prev?.type, id: prev?.id },
          })
      }}
      style={[
        styles.card,
        { width: width, backgroundColor: color, borderColor: withBorder ? colors.inverseOnSurface : color },
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
