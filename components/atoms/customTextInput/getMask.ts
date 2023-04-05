import { Mask } from 'react-native-mask-input'

export const getMask = (label: string, value: string): Mask | undefined => {
  if (label === 'blood_pressure') {
    return value && String(value).startsWith('1' || '2')
      ? [/\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/]
      : [/\d/, /\d/, '/', /\d/, /\d/, /\d/]
  }
  return undefined
}
