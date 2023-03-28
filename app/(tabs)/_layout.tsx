import { Tabs } from 'expo-router'
import { useTheme } from 'react-native-paper'

import { TabBarButton } from '../../components'

export default function TabLayout() {
  const { colors } = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.inversePrimary,
        tabBarInactiveTintColor: colors.inverseOnSurface,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.inverseOnSurface,
          borderTopWidth: 0,
          height: 80,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        tabBarItemStyle: {
          height: 50,
        },
        header: () => null,
      }}>
      <Tabs.Screen
        name='index'
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarButton iconName='blood-bag' color={color} tabName='Donations' />
          ),
        }}
      />
      <Tabs.Screen
        name='progress'
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarButton iconName='progress-check' color={color} tabName='Progress' />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarButton iconName='account-circle' color={color} tabName='Profile' />
          ),
        }}
      />
    </Tabs>
  )
}
