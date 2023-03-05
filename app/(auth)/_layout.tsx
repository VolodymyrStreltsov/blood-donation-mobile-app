import { Tabs } from 'expo-router'
import React from 'react'

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                header: () => null,
                tabBarStyle: {
                    display: 'none',
                },
            }}>
            <Tabs.Screen name='sign-in' />
        </Tabs>
    )
}

export default TabLayout
