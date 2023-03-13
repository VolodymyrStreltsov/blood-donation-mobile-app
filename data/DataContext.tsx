import React, { ReactNode, useState } from 'react'
import { DataContext, DefaultContextValuesInterface } from './CreateDataContext'

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
    NEXT_DONATIONS_DATA: [
      {
        id: 'bd7acbea',
        title: 'Whole blood',
      },
      {
        id: '3ac68afc',
        title: 'Plates',
      },
      {
        id: '58694a0f',
        title: 'Plasma',
      },
      {
        id: '58694dsf',
        title: 'Shmasma',
      },
    ],
    PREVIOUS_DONATIONS_DATA: previousDonationsData,
    BASE_DONATION_INFO: [
      { id: 'date', title: 'Date', initVal: new Date() },
      { id: 'duration', title: 'Duration', initVal: '0' },
      { id: 'volume', title: 'Volume', unit: 'ml', initVal: '450' },
      { id: 'blood_pressure', title: 'Blood Pressure', initVal: '0' },
    ],
    MORPHOLOGY_INDICATORS: [
      { id: 'Hb', title: 'Hb', unit: 'g/dL', initVal: '0' },
      { id: 'Ht', title: 'Ht', unit: '%', initVal: '0' },
      { id: 'MCV', title: 'MCV', unit: 'fL', initVal: '0' },
      { id: 'MCH', title: 'MCH', unit: 'pg', initVal: '0' },
      { id: 'MCHC', title: 'MCHC', unit: 'g/dL', initVal: '0' },
      { id: 'RDW', title: 'RDW', unit: '%', initVal: '0' },
      { id: 'WBC', title: 'WBC', unit: '10^3/μL', initVal: '0' },
      { id: 'PLT', title: 'PLT', unit: '10^3/μL', initVal: '0' },
      { id: 'MPV', title: 'MPV', unit: 'fL', initVal: '0' },
      { id: 'PCT', title: 'PCT', unit: '%', initVal: '0' },
      { id: 'PDW', title: 'PDW', unit: '%', initVal: '0' },
      { id: 'MO', title: 'MO', unit: '%', initVal: '0' },
    ],
    setPreviousDonationsData,
    DONATION_TYPES: [
      { label: 'Whole blood', value: 'Whole_blood' },
      { label: 'Plates', value: 'Plates' },
      { label: 'Plasma', value: 'Plasma' },
    ],
  }

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>
}
export { DataContext }

