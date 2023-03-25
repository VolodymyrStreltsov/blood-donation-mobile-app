import { ScrollView } from 'react-native-gesture-handler'
import { AchievementCard, PageWrapper, Text } from '../../components'

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first',
    title: `Odznaka Zasłużony Honorowy\nDawca Krwi za 5/6 litrów`,
    required: 6,
    progress: 1,
    remainder: '2',
    img: 'I',
  },
  {
    id: 'second',
    title: `Odznaka Zasłużony Honorowy\nDawca Krwi za 10/12 litrów`,
    required: 12,
    progress: 0.4,
    remainder: '5',
    img: 'I,',
  },
  {
    id: 'third',
    title: `Odznaka Zasłużony Honorowy\nDawca Krwi za 15/18 litrów`,
    required: 18,
    progress: 0.3,
    remainder: '10',
    img: 'I',
  },
  {
    id: 'fourth',
    required: 20,
    title: `Honorowy Dawca Krwi —\nZasłużony dla Zdrowia Narodu`,
    progress: 0.1,
    remainder: '16',
    img: 'I',
  },
]

export default function TabProgressScreen() {
  return (
    <PageWrapper>
      <Text variant='h3' align='flex-start' style={{ marginBottom: 8, marginLeft: 16 }}>
        Progress
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {ACHIEVEMENTS.map((item: Achievement) => (
          <AchievementCard
            key={item.id}
            title={item.title}
            progress={item.progress}
            remainder={item.remainder}
            img={item.img}
          />
        ))}
      </ScrollView>
    </PageWrapper>
  )
}
