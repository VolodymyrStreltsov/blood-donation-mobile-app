import React from 'react'
import { Text, TextProps } from '../text/Text'

export const MonoText = (props: TextProps) => (
  <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />
)
