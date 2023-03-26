import { usePathname, useRouter } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { FAB, FABGroupProps, Portal } from 'react-native-paper'
import { Colors } from '../../../constants/Colors'

type Action = Omit<FABGroupProps['actions'][0], 'onPress'> & { name: DonationName }

const actions: Action[] = [
  {
    icon: 'bandage',
    label: 'Disqualification',
    style: { backgroundColor: Colors.DarkAlarm },
    color: Colors.TintColorLight,
    name: 'Disqualification',
  },
  {
    icon: 'gauge',
    label: 'Platelets',
    name: 'Platelets',
  },
  {
    icon: 'water-outline',
    label: 'Whole blood',
    name: 'Whole_blood',
  },
  {
    icon: 'cup-water',
    label: 'Donation',
    size: 'medium',
    style: { backgroundColor: Colors.LightAlarm },
    color: Colors.TintColorDark,
    name: 'Donation',
  },
]

export const MenuFAB = () => {
  const [open, setOpen] = useState<boolean>(false)

  const router = useRouter()
  const pathname = usePathname()

  const onPressAction = useCallback((name: string) => {
    router.push({ pathname: 'modal', params: { name } })
  }, [router])

  const memoizedActions = useMemo(() => {
    return actions.map(action => ({
      ...action,
      onPress: () => onPressAction(action.name),
    }))
  }, [onPressAction])

  return (
    <Portal>
      <FAB.Group
        style={{ paddingBottom: 80 }}
        open={open}
        icon={open ? 'cup-water' : 'plus'}
        fabStyle={{ display: open ? 'none' : undefined }}
        actions={memoizedActions}
        onStateChange={({ open }: { open: boolean }) => setOpen(open)}
        visible={pathname === '/'}
      />
    </Portal>
  )
}
