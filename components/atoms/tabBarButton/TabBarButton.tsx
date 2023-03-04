import { useColorScheme } from 'react-native'
import { Avatar } from 'react-native-paper'
import Colors from '../../../constants/Colors'
import { Text } from '../text/Text'

interface TabBarButtonProps {
  iconName: string
  color: string
  tabName: string
}

export const TabBarButton = ({ iconName, color, tabName }: TabBarButtonProps) => {
  const colorScheme = useColorScheme()
  return (
    <>
      <Avatar.Icon
        size={32}
        icon={iconName}
        color={Colors[colorScheme ?? 'light'].tabIconDefault}
        style={{ width: 64, backgroundColor: color === Colors[colorScheme ?? 'light'].tabIconDefault ? 'transparent' : color }} />
      <Text>{tabName}</Text>
    </>
  )
}