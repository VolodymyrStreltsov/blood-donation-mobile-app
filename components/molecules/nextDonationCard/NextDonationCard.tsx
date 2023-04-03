import { useRouter } from 'expo-router'

import { StyleSheet, View } from 'react-native'
import { Avatar, Card, useTheme } from 'react-native-paper'
import { Text } from '../../atoms'

export const NextDonationCard = ({ item, index }: { item: [string, number]; index: number }) => {
  const router = useRouter()
  const { colors } = useTheme()

  const text = item[0] === 'Leukocytes' ? 'Ask doctor' : !item[1] ? 'You can donate' : `in ${item[1]} days`

  return (
    <Card style={[styles.card, { marginLeft: index === 0 ? 26 : 7 }]} theme={{ roundness: 4 }}
      onPress={() => {
        router.push({ pathname: 'modal', params: { name: item[0], info: 'true', nextDate: item[1] } })
      }}
    >
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Avatar.Text size={40} label={item[0][0]} />
          <Avatar.Icon
            size={30}
            icon='information-outline'
            style={{ backgroundColor: 'transparent' }}
            color={colors.onSurfaceVariant}
          />
        </View>
        <View style={styles.text}>
          <Text align='flex-start' variant='h4'>
            {item[0]}
          </Text>
          <Text align='flex-start' variant='p'>
            {text}
          </Text>
        </View>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 150,
    margin: 7,
    boxShadow: 'none',
  },
  content: {
    justifyContent: 'space-between',
    height: 150,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})