import { createContext } from 'react'

export interface DefaultContextValuesInterface {
  NEXT_DONATIONS_DATA: any[]
  PREVIOUS_DONATIONS_DATA: Donation[]
  BASE_DONATION_INFO: BaseDonationIndicator[]
  MORPHOLOGY_INDICATORS: Indicator[]
  setPreviousDonationsData: (arg: Donation[]) => void
}

export const DataContext = createContext({} as DefaultContextValuesInterface)
