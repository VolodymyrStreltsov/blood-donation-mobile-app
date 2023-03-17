import { useRouter } from 'expo-router'
import { Pressable, StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-paper'
import { Text } from '../../atoms'

export const PreviousDonationListElement = ({ item }: { item: Donation }) => {
  const router = useRouter()

  return (
    <Pressable style={styles.wrapper} onPress={() => router.push({ pathname: 'modal', params: { name: item.baseDonationInfo.type, id: item.id } })}>
      <View style={styles.left}>
        <Avatar.Text size={40} label={item.baseDonationInfo.type[0]} />
        <View style={styles.text}>
          <Text align='flex-start' variant='h5' bold>
            {new Date(item.baseDonationInfo.date).toLocaleDateString()}
          </Text>
          <Text align='flex-start' variant='h4'>
            {item.baseDonationInfo.type}
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text variant='h4' bold>
          450ml
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 16,
    height: 72,
  },
  text: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 16,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
