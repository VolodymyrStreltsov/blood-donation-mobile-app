import { ReactNode, useState } from 'react'
import { ChangeContext, ChangeContextValues } from './createContext'

type ChangeContextProviderProps = {
  children: ReactNode
}

export function ChangeContextProvider({
  children,
}: ChangeContextProviderProps) {
  const [profileChanged, setProfileChanged] = useState(0)
  const [donationChanged, setDonationChanged] = useState(0)

  const values: ChangeContextValues = {
    profileChanged,
    setProfileChanged,
    donationChanged,
    setDonationChanged,
  }

  return (
    <ChangeContext.Provider value={values}>
      {children}
    </ChangeContext.Provider>
  )
}