import { useContext } from 'react'
import { DataContext } from '../../../data/CreateDataContext'
export const getVolume = (type?: string) => {
  switch (type) {
    case 'Whole_blood':
      return '450'
    case 'Platelets':
      return '350'
    case 'Plasma':
      return '600'
    case 'Erythrocytes':
      return '300'
    case 'Leukocytes':
      return '200'
    case 'Plasma_Platelets':
      return '800'
    default:
      return ' '
  }
}

export const useGetDonationDefaultValues = (nameOfDonation: DonationName) => {
  const { BASE_DONATION_NAMES, EXTENDED_DONATION_NAMES } = useContext(DataContext)

  const defaultValues: Donation = {
    type: BASE_DONATION_NAMES.includes(nameOfDonation)
      ? nameOfDonation
      : EXTENDED_DONATION_NAMES[0],
    date: new Date().toISOString(),
    volume: getVolume(nameOfDonation),
    blood_pressure: ' ',
    duration: ' ',
    Hb: ' ',
    Ht: ' ',
    MCV: ' ',
    MCH: ' ',
    MCHC: ' ',
    RDW: ' ',
    WBC: ' ',
    PLT: ' ',
    MPV: ' ',
    PCT: ' ',
    PDW: ' ',
    MO: ' ',
  }

  return defaultValues
}
