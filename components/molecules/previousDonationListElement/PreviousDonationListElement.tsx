import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, View } from 'react-native'
import { Avatar, useTheme } from 'react-native-paper'
import { formattingDate } from '../../../functions'
import { Text } from '../../atoms'

export const PreviousDonationListElement = ({ item }: { item: Partial<Donation> }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { colors } = useTheme()

  return (
    <Pressable
      style={styles.wrapper}
      onPress={() =>
        router.push({
          pathname: 'modal',
          params: { name: item.type, id: item.id },
        })
      }>
      <View style={styles.left}>
        <Avatar.Text size={40} label={item?.type?.[0] || ''} style={{ backgroundColor: colors.inversePrimary }} />
        <View style={styles.text}>
          <Text align='flex-start' variant='h5' bold>
            {formattingDate(item.date || new Date())}
          </Text>
          <Text align='flex-start' variant='h4'>
            {t(`donationTypes.${item.type}`)}
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text variant='h4' bold>
          {item.type === 'Disqualification' ? '🤏🏼' : item.volume + ' ml'}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 16,
    height: 72,
  },
  text: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 16,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
