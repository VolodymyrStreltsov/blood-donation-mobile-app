import React, { useContext } from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  MenuFAB,
  NextDonationCard,
  PageWrapper,
  PreviousDonationListElement,
  Text
} from '../../components'
import { DataContext } from '../../data/DataContext'

export default function TabDonationsScreen() {
  const { NEXT_DONATIONS_DATA, PREVIOUS_DONATIONS_DATA } = useContext(DataContext)
  return (
    <PageWrapper>
      <Text variant='h3' align='flex-start' style={{ marginBottom: 18 }}>
        Next donation
      </Text>
      <SafeAreaView style={{ flex: 0.9, marginHorizontal: -42 }}>
        <FlatList
          horizontal
          data={NEXT_DONATIONS_DATA}
          renderItem={({ item, index }) => <NextDonationCard title={item.title} index={index} />}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
      <Text variant='h3' align='flex-start'>
        Previous donation
      </Text>
      <SafeAreaView style={{ flex: 2.1 }}>
        <FlatList
          data={PREVIOUS_DONATIONS_DATA}
          renderItem={({ item }) => (
            <PreviousDonationListElement item={item} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
      <MenuFAB />
    </PageWrapper>
  )
}
