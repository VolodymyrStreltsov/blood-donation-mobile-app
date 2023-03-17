import { ReactNode, useState } from 'react'
import { DataContext, DefaultContextValuesInterface } from './CreateDataContext'
import {
  ACHIEVEMENTS,
  BASE_DONATION_INFO,
  DONATION_TYPES,
  INFO_SCREENS,
  MORPHOLOGY_INDICATORS,
  NEXT_DONATIONS_DATA,
  PROFILE_DATA,
} from './staticData'

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [previousDonationsData, setPreviousDonationsData] = useState<Donation[]>([
    {
      id: Math.random().toString(36).toString(),
      baseDonationInfo: {
        type: 'Whole_blood',
        date: '2020-05-12T23:50:21.817Z',
        volume: '450',
        blood_pressure: '120/80',
        duration: '10',
      },
      morphology: {
        Hb: '12.3',
        Ht: '45.6',
        MCV: '90.1',
        MCH: '30.2',
        MCHC: '33.3',
        RDW: '14.5',
        WBC: '6.7',
        PLT: '250',
        MPV: '9.1',
        PCT: '0.45',
        PDW: '14.5',
        MO: '0.1',
      },
    },
  ])

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
