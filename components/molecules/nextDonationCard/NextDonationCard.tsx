import { useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'

import { getNextDonationDate } from '../../../data/donations'
import { NextDonationCardMock } from './NextDonationCardMock'

export const NextDonationCard = ({ title, index }: { title: DonationName; index: number }) => {
  const [daysUntilNextDonation, setDaysUntilNextDonation] = useState<number | null>(null)

  if (title === 'Leukocytes') {
    return (
      <NextDonationCardMock title={title} index={index} text='Ask doctor' />
    )
  }

  useFocusEffect(
    useCallback(() => {
      let unsubscribe: (() => void) | undefined
      getNextDonationDate(title)
        .then((res) => {
          if (res) {
            const timeDiff = res.getTime() - new Date().getTime()
            const daysUntilNext = Math.ceil(timeDiff / (1000 * 3600 * 24))
            setDaysUntilNextDonation(daysUntilNext)
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          if (unsubscribe) {
            unsubscribe()
          }
        })
      return () => {
        unsubscribe = undefined
      }
    }, [])
  )

  return (
    <NextDonationCardMock title={title} index={index} text={daysUntilNextDonation === null ? '' : daysUntilNextDonation <= 0 ? 'You can donate' : `in ${daysUntilNextDonation} days`} />
  )
}