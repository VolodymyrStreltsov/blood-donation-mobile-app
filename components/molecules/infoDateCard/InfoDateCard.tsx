import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card } from 'react-native-paper'
import { Text } from '../../atoms'


export const InfoDateCard = ({ title, date, width = '45%', color = '#FFFBFE' }: { title: string, date: string, width?: string, color?: string }) => {

  return (
    <Card style={[styles.card, { width: width, backgroundColor: color }]}>
      <Card.Content style={styles.content}>
        <View style={styles.text}>
          <Text align='flex-start' bold variant='h4'>
            {title}
          </Text>
          <Text align='flex-start' variant='p'>
            {date}
          </Text>
        </View>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    height: 80,
    margin: 7,
    borderRadius: 12,
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 150,
  },
  text: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})
