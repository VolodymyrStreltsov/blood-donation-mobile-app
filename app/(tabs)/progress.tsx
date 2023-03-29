import { useFocusEffect } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { AchievementCard, PageWrapper, Text } from '../../components'
import { getDonationsAmount } from '../../data/donations'
import { getGender } from '../../data/profile'

export default function TabProgressScreen() {
  const [amount, setAmount] = useState(0)
  const [isMale, setIsMale] = useState(false)

  const achievements: Achievement[] = useMemo(() => [
    {
      id: 'first',
      title: `Odznaka Zasłużony Honorowy\nDawca Krwi za 5/6 litrów`,
      required: isMale ? 6000 : 5000,
      img: 1,
    },
    {
      id: 'second',
      title: `Odznaka Zasłużony Honorowy\nDawca Krwi za 10/12 litrów`,
      required: isMale ? 12000 : 10000,
      img: 2,
    },
    {
      id: 'third',
      title: `Odznaka Zasłużony Honorowy\nDawca Krwi za 15/18 litrów`,
      required: isMale ? 18000 : 15000,
      img: 3,
    },
    {
      id: 'fourth',
      required: isMale ? 20000 : 20000,
      title: `Honorowy Dawca Krwi —\nZasłużony dla Zdrowia Narodu`,
      img: 4,
    },
  ], [isMale])

  useFocusEffect(
    useCallback(() => {
      let unsubscribe: (() => void) | undefined
      Promise.all([getGender(), getDonationsAmount()])
        .then(([gender, donationsAmount]) => {
          if (gender) {
            setIsMale(gender === 'male')
          }
          if (donationsAmount) {
            setAmount(donationsAmount)
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
      <Text variant='h3' align='flex-start' style={{ marginBottom: 8, marginLeft: 16 }}>
        Progress
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {achievements.map((item: Achievement) => (
          <AchievementCard
            key={item.id}
            title={item.title}
            progress={amount / item.required}
            remainder={((item.required - amount) / 1000).toString()}
            img={item.img}
          />
        ))}
      </ScrollView>
    </PageWrapper>
  )
}
