import { useRouter } from 'expo-router'

import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Avatar, Card, useTheme } from 'react-native-paper'
import { Text } from '../../atoms'

export const NextDonationCard = ({ item, index }: { item: [string, number]; index: number }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { colors } = useTheme()

  const text = item[0] === 'Leukocytes' ? t('texts.askDoctor') : !item[1] ? t('texts.canDonate') : t('texts.nextDonationIn', { days: item[1] })

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
            {t(`donationTypes.${item[0]}`)}
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