import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Card } from 'react-native-paper'
import { Text } from '../../atoms'

export const NextDonationCard = ({ title, index }: { title: string, index: number }) => {
    return (<Card style={[styles.card, { marginLeft: index === 0 ? 26 : 7 }]}>
        <Card.Content style={styles.content}>
            <View style={styles.header}>
                <Avatar.Text
                    size={40}
                    label={title[0]}
                />
                <Avatar.Icon
                    size={30}
                    icon='information-outline'
                    style={{ backgroundColor: 'transparent' }}
                    color='#130b0b'
                />
            </View>
            <View style={styles.text}>
                <Text darkColor='#130b0b' align='flex-start' variant='h4'>{title}</Text>
                <Text darkColor='#130b0b' align='flex-start' variant='p'>in 3 days</Text>
            </View>
        </Card.Content>
    </Card>)
}


const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 150,
        margin: 7,
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        height: 150,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        display: 'flex',
        justifyContent: 'space-between',
    },
})