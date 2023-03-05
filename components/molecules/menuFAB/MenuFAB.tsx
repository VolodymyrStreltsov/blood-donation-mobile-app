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
                icon={open ? 'calendar-today' : 'plus'}
                actions={[
                    {
                        icon: 'plus',
                        label: 'Star',
                        onPress: () => {
                            router.push('modal')
                        },
                    },
                    { icon: 'star', label: 'Star', onPress: () => { router.push('modal') } },
                    { icon: 'email', label: 'Email', onPress: () => { router.push('modal') } },
                ]}
                onStateChange={({ open }: { open: boolean }) => setOpen(open)}
                visible={pathname === '/'}
            />
        </Portal>
    )
}
