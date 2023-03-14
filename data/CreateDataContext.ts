import { createContext } from 'react'

export interface DefaultContextValuesInterface {
  DONATION_TYPES: DropdownType[]
  NEXT_DONATIONS_DATA: any[]
  PREVIOUS_DONATIONS_DATA: Donation[]
  BASE_DONATION_INFO: BaseDonationIndicator[]
  ACHIEVEMENTS: Achievement[]
  PROFILE_DATA: ProfileDataRecord[]
  MORPHOLOGY_INDICATORS: Indicator[]
  INFO_SCREENS: infoScreenData[]
  setPreviousDonationsData: (arg: Donation[]) => void
}

export const DataContext = createContext({} as DefaultContextValuesInterface)
