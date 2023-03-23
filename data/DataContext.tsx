import { ReactNode } from 'react'
import { DataContext, DefaultContextValuesInterface } from './CreateDataContext'
import {
  ACHIEVEMENTS,
  BASE_DONATION_INDICATORS,
  BASE_DONATION_NAMES,
  EXTENDED_DONATION_NAMES,
  INFO_SCREENS,
  MORPHOLOGY_INDICATORS,
  NEXT_DONATIONS_DATA,
  PROFILE_DATA
} from './staticData'

export const DataProvider = ({ children }: { children: ReactNode }) => {

  const values: DefaultContextValuesInterface = {
    BASE_DONATION_NAMES: BASE_DONATION_NAMES,
    EXTENDED_DONATION_NAMES: EXTENDED_DONATION_NAMES,
    NEXT_DONATIONS_DATA: NEXT_DONATIONS_DATA,
    BASE_DONATION_INDICATORS: BASE_DONATION_INDICATORS,
    MORPHOLOGY_INDICATORS: MORPHOLOGY_INDICATORS,
    ACHIEVEMENTS: ACHIEVEMENTS,
    PROFILE_DATA: PROFILE_DATA,
    INFO_SCREENS: INFO_SCREENS,
  }

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>
}
export { DataContext }
