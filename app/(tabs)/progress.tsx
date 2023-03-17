import { useContext } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { AchievementCard, PageWrapper, Text } from '../../components'
import { DataContext } from '../../data/CreateDataContext'

export default function TabProgressScreen() {
  const { ACHIEVEMENTS } = useContext(DataContext)
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
