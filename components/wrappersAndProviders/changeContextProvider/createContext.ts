/* eslint-disable @typescript-eslint/no-empty-function */
import { Dispatch, SetStateAction, createContext, useContext } from 'react'

export interface ChangeContextValues {
  profileChanged: number
  setProfileChanged: Dispatch<SetStateAction<number>>
  donationChanged: number
  setDonationChanged: Dispatch<SetStateAction<number>>
}

export const ChangeContext = createContext<ChangeContextValues>({
  profileChanged: 0,
  setProfileChanged: (x) => x,
  donationChanged: 0,
  setDonationChanged: (x) => x,
})

export function useChangeContext() {
  return useContext(ChangeContext)
}
