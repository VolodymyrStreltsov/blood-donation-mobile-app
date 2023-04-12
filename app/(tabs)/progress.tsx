import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import { AchievementCard, PageWrapper, Text, useChangeContext } from '../../components'
import { getDonationsAmount } from '../../data/donations'
import { getGender } from '../../data/profile'

export default function TabProgressScreen() {
  const { t } = useTranslation()
  const { donationChanged, profileChanged } = useChangeContext()
  const [amount, setAmount] = useState(0)
  const [isMale, setIsMale] = useState(false)

  const achievements: Achievement[] = useMemo(() => [
    {
      id: 'first',
      required: isMale ? 6000 : 5000,
    },
    {
      id: 'second',
      required: isMale ? 12000 : 10000,
    },
    {
      id: 'third',
      required: isMale ? 18000 : 15000,
    },
    {
      id: 'fourth',
      required: isMale ? 20000 : 20000,
    },
  ], [isMale])

  useEffect(() => {
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
  }, [donationChanged, profileChanged])

  return (
    <PageWrapper>
      <Text variant='h3' align='flex-start' style={{ marginBottom: 8, marginLeft: 16 }}>
        {t('headers.progress')}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {achievements.map((item: Achievement) => (
          <AchievementCard
            key={item.id}
            title={t(`achievements.${item.id}`)}
            progress={amount / item.required}
            remainder={((item.required - amount) / 1000).toString()}
          />
        ))}
      </ScrollView>
    </PageWrapper>
  )
}
