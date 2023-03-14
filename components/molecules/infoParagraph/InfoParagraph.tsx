import React from 'react'
import { StyleSheet } from 'react-native'
import { Avatar } from 'react-native-paper'
import { Text, View } from '../../atoms'

export const InfoParagraph = ({ text, idx }: { text: string, idx: number }) => {
  const zero = idx === 0
  return (
    <View style={styles.container}>
      <Avatar.Icon
        style={styles.icon}
        size={zero ? 30 : 20}
        icon={zero ? 'alarm' : 'adjust'}
        color='#130b0b'
      />
      <View style={{ paddingHorizontal: 16, width: '90%' }}>
        <Text variant='p'>{text}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  icon: {
    backgroundColor: 'transparent',
  }
})