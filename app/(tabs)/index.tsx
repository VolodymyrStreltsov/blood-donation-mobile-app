import { useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import { FlatList, View } from 'react-native'
import {
  MenuFAB,
  NextDonationCard,
  PageWrapper,
  PreviousDonationListElement,
  Text
} from '../../components'
import { getAllDonations } from '../../data/donations'

const nextDonations: DonationName[] = [
  'Whole_blood',
  'Platelets',
  'Plasma',
  'Erythrocytes',
  'Leukocytes',
]

export default function TabDonationsScreen() {
  const [previousDonations, setPreviousDonations] = useState<Partial<Donation>[]>([])

  useFocusEffect(
    useCallback(() => {
      let unsubscribe: (() => void) | undefined
      getAllDonations()
        .then((res) => {
          if (res) {
            setPreviousDonations(res)
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

  return (
    <PageWrapper>
      <Text variant='h3' align='flex-start' style={{ marginBottom: 18, marginLeft: 16 }}>
        Next donation
      </Text>
      <View style={{ height: 175, marginHorizontal: -26 }}>
        <FlatList
          horizontal
          data={nextDonations}
          renderItem={({ item, index }) => <NextDonationCard title={item} index={index} />}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Text variant='h3' align='flex-start' style={{ marginBottom: 18, marginLeft: 16 }}>
        Previous donations
      </Text>
      <View style={{ flex: 1 }}>
        {previousDonations.length > 0 ?
          <FlatList
            data={previousDonations}
            renderItem={({ item }) => <PreviousDonationListElement item={item} />}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
          /> : null}
      </View>
      <MenuFAB />
    </PageWrapper>
  )
}
