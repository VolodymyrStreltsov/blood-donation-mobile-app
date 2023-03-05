import { Tabs } from 'expo-router'
import React from 'react'
import { useColorScheme } from 'react-native'
import { TabBarButton } from '../../components'

import Colors from '../../constants/Colors'

const TabLayout = () => {
    const colorScheme = useColorScheme()

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor:
                    Colors[colorScheme ?? 'light'].tabIconSelected,
                tabBarInactiveTintColor:
                    Colors[colorScheme ?? 'light'].tabIconDefault,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: Colors[colorScheme ?? 'light'].nawBar,
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
                        <TabBarButton
                            iconName='bat'
                            color={color}
                            tabName='Donations'
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='progress'
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarButton
                            iconName='beaker-outline'
                            color={color}
                            tabName='Progress'
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarButton
                            iconName='account-cowboy-hat-outline'
                            color={color}
                            tabName='Profile'
                        />
                    ),
                }}
            />
        </Tabs>
    )
}

export default TabLayout
