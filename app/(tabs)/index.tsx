import React from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NEXT_DONATIONS_DATA, PREVIOUS_DONATIONS_DATA } from '../../assets/data/dataArrays'
import {
  MenuFAB,
  NextDonationCard,
  PageWrapper,
  PreviousDonationListElement,
  Text,
} from '../../components'

export default function TabDonationsScreen() {
  return (
    <PageWrapper>
      <Text variant='h3' align='flex-start' style={{ marginLeft: 42, marginBottom: 18 }}>
        Next donation
      </Text>
      <SafeAreaView style={{ flex: 0.9 }}>
        <FlatList
          horizontal
          data={NEXT_DONATIONS_DATA}
          renderItem={({ item, index }) => <NextDonationCard title={item.title} index={index} />}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
      <Text variant='h3' align='flex-start' style={{ marginLeft: 42 }}>
        Previous donation
      </Text>
      <SafeAreaView style={{ flex: 2 }}>
        <FlatList
          data={PREVIOUS_DONATIONS_DATA}
          renderItem={({ item }) => (
            <PreviousDonationListElement type={item.type} date={item.date} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
      <MenuFAB />
    </PageWrapper>
  )
}
