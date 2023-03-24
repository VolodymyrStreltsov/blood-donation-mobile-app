import { useFocusEffect } from 'expo-router'
import { useCallback, useContext, useState } from 'react'
import { FlatList } from 'react-native'
import {
  MenuFAB,
  NextDonationCard,
  PageWrapper,
  PreviousDonationListElement,
  Text,
  View
} from '../../components'
import { getAllDonations } from '../../data/database'
import { DataContext } from '../../data/DataContext'

export default function TabDonationsScreen() {
  const [PREVIOUS_DONATIONS_DATA, setPREVIOUS_DONATIONS_DATA] = useState<Donation[] | null>(null)

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = getAllDonations()
        .then((res) => {
          if (res) {
            setPREVIOUS_DONATIONS_DATA(res as Donation[])
          }
        })
        .catch((error) => {
          console.error(error)
        })
      return () => unsubscribe
    }, [])
  )

  console.log(PREVIOUS_DONATIONS_DATA)

  const { NEXT_DONATIONS_DATA } = useContext(DataContext)


  return (
    <PageWrapper>
      <Text variant='h3' align='flex-start' style={{ marginBottom: 18, marginLeft: 16 }}>
        Next donation
      </Text>
      <View style={{ height: 175, marginHorizontal: -26 }}>
        <FlatList
          horizontal
          data={NEXT_DONATIONS_DATA}
          renderItem={({ item, index }) => <NextDonationCard title={item} index={index} />}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Text variant='h3' align='flex-start' style={{ marginBottom: 18, marginLeft: 16 }}>
        Previous donation
      </Text>
      <View style={{ flex: 1 }}>
        {PREVIOUS_DONATIONS_DATA &&
          <FlatList
            data={PREVIOUS_DONATIONS_DATA}
            renderItem={({ item }) => <PreviousDonationListElement item={item} />}
            keyExtractor={(item) => item.id ?? item.id + ''} // TODO: fix this
            showsVerticalScrollIndicator={false}
          />}
      </View>
      <MenuFAB />
    </PageWrapper>
  )
}
