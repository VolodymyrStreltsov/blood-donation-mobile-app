import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, View } from 'react-native'
import {
  MenuFAB,
  NextDonationCard,
  NextDonationCardSkeleton,
  PageWrapper,
  PreviousDonationListElement,
  PreviousDonationListElementSkeleton,
  Text,
  useChangeContext
} from '../../components'
import { getAllDonations, getNextDonationsDate } from '../../data/donations'
import setLanguage from '../../localization/i18n'

export default function TabDonationsScreen() {
  const { t } = useTranslation()
  const { donationChanged, profileChanged } = useChangeContext()
  const [nextDonations, setNextDonations] = useState<[string, number][]>([])
  const [previousDonations, setPreviousDonations] = useState<Partial<Donation>[]>([])
  const [loadingNextDonations, setLoadingNextDonations] = useState<boolean>(true)
  const [loadingPreviousDonations, setLoadingPreviousDonations] = useState<boolean>(true)

  useEffect(() => {
    setLoadingNextDonations(true)
    setLoadingPreviousDonations(true)
    Promise.all([getNextDonationsDate(), getAllDonations()])
      .then(([nextDonationsData, previousDonationsData]) => {
        if (nextDonationsData) {
          setNextDonations(Object.entries(nextDonationsData))
        }
        if (previousDonationsData) {
          setPreviousDonations(previousDonationsData)
        }
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoadingNextDonations(false)
        setLoadingPreviousDonations(false)
      })
  }, [donationChanged])

  useEffect(() => {
    setLoadingNextDonations(true)
    setLanguage()
    getNextDonationsDate()
      .then((nextDonationsData) => {
        if (nextDonationsData) {
          setNextDonations(Object.entries(nextDonationsData))
        }
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoadingNextDonations(false)
      })
  }, [profileChanged])

  const MemoizedNextDonationCard = memo(NextDonationCard)
  const MemoizedPreviousDonationListElement = memo(PreviousDonationListElement)

  return (
    <PageWrapper>
      <Text variant='h3' align='flex-start' style={{ marginBottom: 18, marginLeft: 16 }}>
        {t('headers.nextDonation')}
      </Text>
      <View style={{ height: 175, marginHorizontal: -26 }}>
        {loadingNextDonations ? (
          <NextDonationCardSkeleton />
        ) : (
          <FlatList
            horizontal
            data={nextDonations}
            renderItem={({ item, index }) => <MemoizedNextDonationCard item={item} index={index} />}
            keyExtractor={(item) => item[0]}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
      <Text variant='h3' align='flex-start' style={{ marginBottom: 18, marginLeft: 16 }}>
        {t('headers.previousDonations')}
      </Text>
      <View style={{ flex: 1 }}>
        {loadingPreviousDonations ? (
          <PreviousDonationListElementSkeleton />
        ) : previousDonations.length > 0 ? (
          <FlatList
            data={previousDonations}
            renderItem={({ item }) => <MemoizedPreviousDonationListElement item={item} />}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
          />
        ) : null}
      </View>
      <MenuFAB />
    </PageWrapper>
  )
}
