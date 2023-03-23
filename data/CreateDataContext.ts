import { createContext } from 'react'

export interface DefaultContextValuesInterface {
  BASE_DONATION_NAMES: DonationName[]
  EXTENDED_DONATION_NAMES: DonationName[]
  NEXT_DONATIONS_DATA: any[]
  BASE_DONATION_INDICATORS: Indicator<BaseDonationInfo>[]
  ACHIEVEMENTS: Achievement[]
  PROFILE_DATA: ProfileDataRecord[]
  MORPHOLOGY_INDICATORS: Indicator<MorphologyIndicators>[]
  INFO_SCREENS: infoScreenData[]
}

export const DataContext = createContext({} as DefaultContextValuesInterface)
