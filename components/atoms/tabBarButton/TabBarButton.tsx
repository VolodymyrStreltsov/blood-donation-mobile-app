import { Avatar, useTheme } from 'react-native-paper'
import { Text } from '../text/Text'

interface TabBarButtonProps {
  iconName: string
  color: string
  tabName: string
}

export const TabBarButton = ({ iconName, color, tabName }: TabBarButtonProps) => {
  const { colors } = useTheme()

  return (
    <>
      <Avatar.Icon
        size={32}
        icon={iconName}
        color={colors.inverseSurface}
        style={{
          width: 64,
          backgroundColor:
            color === colors.inverseSurface ? 'transparent' : color,
        }}
      />
      <Text variant='h5' bold>
        {tabName}
      </Text>
    </>
  )
}
