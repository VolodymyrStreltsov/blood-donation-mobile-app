import { useContext } from 'react'
import { FlatList } from 'react-native'
import {
  MenuFAB,
  NextDonationCard,
  PageWrapper,
  PreviousDonationListElement,
  Text,
  View
} from '../../components'
import { DataContext } from '../../data/DataContext'

export default function TabDonationsScreen() {
  const { NEXT_DONATIONS_DATA, PREVIOUS_DONATIONS_DATA } = useContext(DataContext)
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
        <FlatList
          data={PREVIOUS_DONATIONS_DATA}
          renderItem={({ item }) => <PreviousDonationListElement item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <MenuFAB />
    </PageWrapper>
  )
}
