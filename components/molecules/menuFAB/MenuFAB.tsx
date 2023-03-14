import { usePathname, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { FAB, Portal } from 'react-native-paper'
import { Colors } from '../../../constants/Colors'

export const MenuFAB = () => {
  const [open, setOpen] = useState<boolean>(false)

  const router = useRouter()
  const pathname = usePathname()

  return (
    <Portal>
      <FAB.Group
        style={{ paddingBottom: 80 }}
        open={open}
        icon={open ? 'cup-water' : 'plus'}
        fabStyle={{ display: open ? 'none' : undefined }}
        actions={[
          {
            icon: 'bandage',
            label: 'Disqualification',
            style: { backgroundColor: Colors.DarkAlarm },
            color: Colors.TintColorLight,
            onPress: () => {
              router.push({ pathname: 'modal', params: { name: 'Disqualification' } })
            },
          },
          {
            icon: 'gauge',
            label: 'Platelets',
            onPress: () => {
              router.push({ pathname: 'modal', params: { name: 'Platelets' } })
            },
          },
          {
            icon: 'water-outline',
            label: 'Whole blood',
            onPress: () => {
              router.push({ pathname: 'modal', params: { name: 'Whole_blood' } })
            },
          },
          {
            icon: 'cup-water',
            label: 'Donation',
            size: 'medium',
            style: { display: open ? 'flex' : 'none', backgroundColor: Colors.LightAlarm },
            color: Colors.TintColorDark,
            onPress: () => {
              router.push({ pathname: 'modal', params: { name: 'Donation' } })
            },
          },
        ]}
        onStateChange={({ open }: { open: boolean }) => setOpen(open)}
        visible={pathname === '/'}
      />
    </Portal>
  )
}
