import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Dimensions, Platform, ScrollView, StyleSheet, View } from 'react-native'
import { Appbar, useTheme } from 'react-native-paper'
import { getLastDonationWithType } from '../../../data/donations'
import { formattingDate } from '../../../functions'
import { Text } from '../../atoms'
import { InfoDateCard, InfoParagraph } from '../../molecules'

const infoScreensData: InfoScreenData[] = [
  {
    id: 'Whole_blood',
    paragraphs: [
      'Krew pełna jest pobierana nie częściej niż 6 razy w roku od mężczyzn i nie częściej niż 4 razy w roku od kobiet, z tym, że przerwa pomiędzy pobraniami musi wynosić 8 tygodni*;',
      'Jednorazowo od osoby ważącej co najmniej 50 kg lub więcej można pobrać 450± 45 ml krwi (1 jednostka);',
      'Jeżeli dawca został poddany zabiegowi aferezy, pobranie krwi pełnej może nastąpić najwcześniej po upływie 48 godzin od tego zabiegu, z wyjątkiem zabiegu erytroaferezy;',
      'Całkowita jednorazowa utrata krwinek czerwonych przez dawcę nie może przekroczyć wartości, która w warunkach izowolemicznych doprowadziłaby do obniżenia stężenia hemoglobiny u dawcy poniżej 110g/l (6,8mmol/l).',
    ],
  },
  {
    id: 'Platelets',
    paragraphs: [
      'Krew pełna jest pobierana nie częściej niż 6 razy w roku od mężczyzn i nie częściej niż 4 razy w roku od kobiet, z tym, że przerwa pomiędzy pobraniami musi wynosić 8 tygodni*;',
      'Jednorazowo od osoby ważącej co najmniej 50 kg lub więcej można pobrać 450± 45 ml krwi (1 jednostka);',
      'Jeżeli dawca został poddany zabiegowi aferezy, pobranie krwi pełnej może nastąpić najwcześniej po upływie 48 godzin od tego zabiegu, z wyjątkiem zabiegu erytroaferezy;',
      'Całkowita jednorazowa utrata krwinek czerwonych przez dawcę nie może przekroczyć wartości, która w warunkach izowolemicznych doprowadziłaby do obniżenia stężenia hemoglobiny u dawcy poniżej 110g/l (6,8mmol/l).',
    ],
  },
  {
    id: 'Plasma',
    paragraphs: [
      'Krew pełna jest pobierana nie częściej niż 6 razy w roku od mężczyzn i nie częściej niż 4 razy w roku od kobiet, z tym, że przerwa pomiędzy pobraniami musi wynosić 8 tygodni*;',
      'Jednorazowo od osoby ważącej co najmniej 50 kg lub więcej można pobrać 450± 45 ml krwi (1 jednostka);',
      'Jeżeli dawca został poddany zabiegowi aferezy, pobranie krwi pełnej może nastąpić najwcześniej po upływie 48 godzin od tego zabiegu, z wyjątkiem zabiegu erytroaferezy;',
      'Całkowita jednorazowa utrata krwinek czerwonych przez dawcę nie może przekroczyć wartości, która w warunkach izowolemicznych doprowadziłaby do obniżenia stężenia hemoglobiny u dawcy poniżej 110g/l (6,8mmol/l).',
    ],
  },
  {
    id: 'Erythrocytes',
    paragraphs: [
      'Krew pełna jest pobierana nie częściej niż 6 razy w roku od mężczyzn i nie częściej niż 4 razy w roku od kobiet, z tym, że przerwa pomiędzy pobraniami musi wynosić 8 tygodni*;',
      'Jednorazowo od osoby ważącej co najmniej 50 kg lub więcej można pobrać 450± 45 ml krwi (1 jednostka);',
      'Jeżeli dawca został poddany zabiegowi aferezy, pobranie krwi pełnej może nastąpić najwcześniej po upływie 48 godzin od tego zabiegu, z wyjątkiem zabiegu erytroaferezy;',
      'Całkowita jednorazowa utrata krwinek czerwonych przez dawcę nie może przekroczyć wartości, która w warunkach izowolemicznych doprowadziłaby do obniżenia stężenia hemoglobiny u dawcy poniżej 110g/l (6,8mmol/l).',
    ],
  },
  {
    id: 'Leukocytes',
    paragraphs: [
      'Krew pełna jest pobierana nie częściej niż 6 razy w roku od mężczyzn i nie częściej niż 4 razy w roku od kobiet, z tym, że przerwa pomiędzy pobraniami musi wynosić 8 tygodni*;',
      'Jednorazowo od osoby ważącej co najmniej 50 kg lub więcej można pobrać 450± 45 ml krwi (1 jednostka);',
      'Jeżeli dawca został poddany zabiegowi aferezy, pobranie krwi pełnej może nastąpić najwcześniej po upływie 48 godzin od tego zabiegu, z wyjątkiem zabiegu erytroaferezy;',
      'Całkowita jednorazowa utrata krwinek czerwonych przez dawcę nie może przekroczyć wartości, która w warunkach izowolemicznych doprowadziłaby do obniżenia stężenia hemoglobiny u dawcy poniżej 110g/l (6,8mmol/l).',
    ],
  },
]

export const DonationInfoScreen = ({ nameOfDonation, nextDate }: { nameOfDonation: string, nextDate: string }) => {
  const screenInfo =
    infoScreensData.find((el: InfoScreenData) => el.id === nameOfDonation)?.paragraphs || []

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
          {nameOfDonation}
        </Text>
        <View style={styles.cardsContainer}>
          <InfoDateCard title='Last donation' date={lastDonationOfType.id ? formattingDate(lastDonationOfType.date) : 'never'} withBorder={!lastDonationOfType.id} prev={{ id: lastDonationOfType.id, type: nameOfDonation }} color={lastDonationOfType.id ? colors.surface : colors.inverseOnSurface} />
          <InfoDateCard color={colors.inverseOnSurface} title='Next donation' date={formattingDate(next)} />
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
