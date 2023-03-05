import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-paper'
import { Text } from '../../atoms'

export const PreviousDonationListElement = ({ type, data }: { type: string, data: string }) => {
    return (<View style={styles.wrapper}>
        <View style={styles.left}>
            <Avatar.Text
                size={40}
                label={type[0]}

            />
            <View style={styles.text}>
                <Text align='flex-start' variant='h5' bold>{data}</Text>
                <Text align='flex-start' variant='h4'>{type}</Text>
            </View>
        </View>
        <View style={styles.right}>
            <Text variant='h4' bold>450ml</Text>
        </View>
    </View>)
}


const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.8,
        height: 72,
    },
    text: {
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: 16,
    },
    left: {
        display: 'flex',
        flexDirection: 'row',
    },
    right: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})