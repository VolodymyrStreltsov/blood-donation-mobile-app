import React, { ReactNode, useState } from 'react'
import { DataContext, DefaultContextValuesInterface } from './CreateDataContext'
import { ACHIEVEMENTS, BASE_DONATION_INFO, DONATION_TYPES, INFO_SCREENS, MORPHOLOGY_INDICATORS, NEXT_DONATIONS_DATA, PROFILE_DATA } from './staticData'

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [previousDonationsData, setPreviousDonationsData] = useState<Donation[]>([
    {
      id: 'bd7',
      baseDonationInfo: {
        type: 'Whole_blood',
        date: '2021-05-11T12:18:46.407Z',
        volume: '450',
        blood_pressure: '120/80',
      },
      morphology: {
        Hb: '13',
        Ht: '50',
        MCV: '15',
        MCH: '23',
        MCHC: '123',
        RDW: '1',
        WBC: '2',
        PLT: '2.3',
        MPV: '1.3',
        PCT: '3',
        PDW: '12.3',
        MO: '43',
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

