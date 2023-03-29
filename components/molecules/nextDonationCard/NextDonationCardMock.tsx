import { useRouter } from 'expo-router'

import { Pressable, StyleSheet, View } from 'react-native'
import { Avatar, Card, useTheme } from 'react-native-paper'
import { Text } from '../../atoms'

export const NextDonationCardMock = ({ title, index, text }: { title: DonationName, index: number, text: string }) => {
  const router = useRouter()
  const { colors } = useTheme()

  return (
    <Card style={[styles.card, { marginLeft: index === 0 ? 26 : 7 }]} theme={{ roundness: 4 }}>
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Avatar.Text size={40} label={title[0]} />
          <Pressable
            onPress={() => {
              router.push({ pathname: 'modal', params: { name: title, info: 'true' } })
            }}>
            <Avatar.Icon
              size={30}
              icon='information-outline'
              style={{ backgroundColor: 'transparent' }}
              color={colors.onSurfaceVariant}
            />
          </Pressable>
        </View>
        <View style={styles.text}>
          <Text align='flex-start' variant='h4'>
            {title}
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