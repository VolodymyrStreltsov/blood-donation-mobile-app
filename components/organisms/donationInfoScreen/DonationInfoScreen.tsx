import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, Platform, ScrollView, StyleSheet, View } from 'react-native'
import { Appbar, useTheme } from 'react-native-paper'
import { getLastDonationWithType } from '../../../data/donations'
import { formattingDate } from '../../../functions'
import { Text } from '../../atoms'
import { InfoDateCard, InfoParagraph } from '../../molecules'

export const DonationInfoScreen = ({ nameOfDonation, nextDate }: { nameOfDonation: string, nextDate: string }) => {
  const { t } = useTranslation()

  const [lastDonationOfType, setLastDonationOfType] = useState<Donation>({} as Donation)

  useEffect(() => {
    getLastDonationWithType(nameOfDonation as DonationName).then((res) => {
      setLastDonationOfType(res)
    })
  }, [])


  const date = new Date()
  const next = date.setDate(date.getDate() + +nextDate)
  const router = useRouter()
  const { colors } = useTheme()

  return (
    <>
      <Appbar.Header style={styles.appbarContainer}>
        <Appbar.BackAction onPress={() => router.back()} />
      </Appbar.Header>
      <View style={styles.container}>
        <Text variant='h2' align='flex-start' style={{ marginBottom: 30 }}>
          {t(`donationTypes.${nameOfDonation}`)}
        </Text>
        <View style={styles.cardsContainer}>
          <InfoDateCard title={t('headers.lastDonation')} date={lastDonationOfType.id ? formattingDate(lastDonationOfType.date) : t('texts.never')} withBorder={!lastDonationOfType.id} prev={{ id: lastDonationOfType.id, type: nameOfDonation }} color={lastDonationOfType.id ? colors.surface : colors.inverseOnSurface} />
          <InfoDateCard color={colors.inverseOnSurface} title={t('headers.nextDonation')} date={formattingDate(next)} />
        </View>
        <ScrollView
          contentContainerStyle={styles.paragraphsContainer}
          showsVerticalScrollIndicator={false}>
          {['1', '2', '3', '4'].map((item: string, idx) => (
            <InfoParagraph key={item} text={t(`infoParagraphs.${nameOfDonation}.${item}`)} idx={idx} />
          ))}
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  appbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    width: Platform.OS === 'web' ? '100vw' : Dimensions.get('window').width,
    marginTop: Platform.OS === 'web' ? 0 : -25,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: '100%',
    height: 115,
  },
  paragraphsContainer: {
    flex: 1,
    width: '100%',
    rowGap: 7,
  },
})
