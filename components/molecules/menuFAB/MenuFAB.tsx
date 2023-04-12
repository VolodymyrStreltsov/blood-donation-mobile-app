import { usePathname, useRouter } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FAB, FABGroupProps, Portal, useTheme } from 'react-native-paper'

type Action = Omit<FABGroupProps['actions'][0], 'onPress'> & { name: DonationName }

export const MenuFAB = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const actions: Action[] = [
    {
      icon: 'bandage',
      style: { backgroundColor: colors.error },
      color: colors.background,
      name: 'Disqualification',
    },
    {
      icon: 'gauge',
      name: 'Platelets',
    },
    {
      icon: 'water-outline',
      name: 'Whole_blood',
    },
    {
      icon: 'cup-water',
      size: 'medium',
      style: { backgroundColor: colors.tertiary },
      color: colors.background,
      name: 'Donation',
    },
  ]
  const [open, setOpen] = useState<boolean>(false)

  const router = useRouter()
  const pathname = usePathname()

  const onPressAction = useCallback((name: string) => {
    router.push({ pathname: 'modal', params: { name } })
  }, [router])

  const memoizedActions = useMemo(() => {
    return actions.map(action => ({
      ...action,
      label: t(`donationTypes.${action.name}`),
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
