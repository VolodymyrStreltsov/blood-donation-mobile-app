import { useRouter } from 'expo-router'
import { useContext } from 'react'
import { Dimensions, Platform, ScrollView, StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'
import { Colors } from '../../../constants/Colors'
import { DataContext } from '../../../data/CreateDataContext'
import { Text, View } from '../../atoms'
import { InfoDateCard, InfoParagraph } from '../../molecules'

export const DonationInfoScreen = ({ nameOfDonation }: { nameOfDonation: string }) => {
  const { INFO_SCREENS } = useContext(DataContext)

  const screenInfo =
    INFO_SCREENS.find((el: infoScreenData) => el.id === nameOfDonation)?.paragraphs || []

  const router = useRouter()

  return (
    <>
      <Appbar.Header style={styles.appbarContainer}>
        <Appbar.BackAction onPress={() => router.back()} />
      </Appbar.Header>
      <View style={styles.container}>
        <Text variant='h2' align='flex-start' style={{ marginBottom: 30 }}>
          {nameOfDonation}
        </Text>
        <View style={styles.cardsContainer}>
          <InfoDateCard title='Last donation' date='20.01.2019' withBorder />
          <InfoDateCard color={Colors.TintColorLight} title='Next donation' date='03.04.2023' />
        </View>
        <ScrollView
          contentContainerStyle={styles.paragraphsContainer}
          showsVerticalScrollIndicator={false}>
          {screenInfo.map((item: string, idx) => (
            <InfoParagraph key={nameOfDonation + idx} text={item} idx={idx} />
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
