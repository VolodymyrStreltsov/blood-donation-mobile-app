import React, { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { View } from '../../atoms'

type PageWrapperProps = {
    children: ReactNode
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
    return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
