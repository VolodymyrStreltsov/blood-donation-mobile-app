import { ReactNode, useState } from 'react'
import { DataContext, DefaultContextValuesInterface } from './CreateDataContext'
import { ACHIEVEMENTS, BASE_DONATION_INFO, DONATION_TYPES, INFO_SCREENS, MORPHOLOGY_INDICATORS, NEXT_DONATIONS_DATA, PROFILE_DATA } from './staticData'

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [previousDonationsData, setPreviousDonationsData] = useState<Donation[]>([])

  const values: DefaultContextValuesInterface = {
    NEXT_DONATIONS_DATA: NEXT_DONATIONS_DATA,
    BASE_DONATION_INFO: BASE_DONATION_INFO,
    MORPHOLOGY_INDICATORS: MORPHOLOGY_INDICATORS,
    DONATION_TYPES: DONATION_TYPES,
    ACHIEVEMENTS: ACHIEVEMENTS,
    PROFILE_DATA: PROFILE_DATA,
    INFO_SCREENS: INFO_SCREENS,
    PREVIOUS_DONATIONS_DATA: previousDonationsData,
    setPreviousDonationsData,
  }

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>
}
export { DataContext }

