import { useFocusEffect } from 'expo-router'
import { memo, useCallback, useState } from 'react'
import { FlatList, View } from 'react-native'
import {
  MenuFAB,
  NextDonationCard,
  PageWrapper,
  PreviousDonationListElement,
  Text
} from '../../components'
import { getAllDonations, getNextDonationsDate } from '../../data/donations'

export default function TabDonationsScreen() {
  const [nextDonations, setNextDonations] = useState<[string, number][]>([])
  const [previousDonations, setPreviousDonations] = useState<Partial<Donation>[]>([])

  useFocusEffect(
    useCallback(() => {
      let unsubscribe: (() => void) | undefined
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
          if (unsubscribe) {
            unsubscribe()
          }
        })
      return () => {
        unsubscribe = undefined
      }
    }, [])
  )

  const MemoizedNextDonationCard = memo(NextDonationCard)
  const MemoizedPreviousDonationListElement = memo(PreviousDonationListElement)

  return (
    <PageWrapper>
      <Text variant='h3' align='flex-start' style={{ marginBottom: 18, marginLeft: 16 }}>
        Next donation
      </Text>
      <View style={{ height: 175, marginHorizontal: -26 }}>
        <FlatList
          horizontal
          data={nextDonations}
          renderItem={({ item, index }) => <MemoizedNextDonationCard item={item} index={index} />}
          keyExtractor={(item) => item[0]}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Text variant='h3' align='flex-start' style={{ marginBottom: 18, marginLeft: 16 }}>
        Previous donations
      </Text>
      <View style={{ flex: 1 }}>
        {previousDonations.length > 0 ? (
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
