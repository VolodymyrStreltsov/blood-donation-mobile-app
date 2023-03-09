import { usePathname, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { FAB, Portal } from 'react-native-paper'

export const MenuFAB = () => {
  const [open, setOpen] = useState<boolean>(false)

  const router = useRouter()
  const pathname = usePathname()

  return (
    <Portal>
      <FAB.Group
        style={{ paddingBottom: 80 }}
        open={open}
        icon={open ? 'fountain-pen' : 'plus'}
        actions={[
          {
            icon: 'bandage',
            label: 'Disqualification',
            style: { backgroundColor: '#B3261E' },
            color: '#fff',
            onPress: () => {
              router.push({ pathname: 'modal', params: { name: 'disqualification', mode: 'add' } })
            },
          },
          {
            icon: 'tag-heart',
            label: 'Platelets',
            onPress: () => {
              router.push({ pathname: 'modal', params: { name: 'platelets', mode: 'add' } })
            },
          },
          {
            icon: 'grease-pencil',
            label: 'Whole blood',
            onPress: () => {
              router.push({ pathname: 'modal', params: { name: 'whole-blood', mode: 'add' } })
            },
          },
        ]}
        onStateChange={({ open }: { open: boolean }) => setOpen(open)}
        visible={pathname === '/'}
      />
    </Portal>
  )
}
