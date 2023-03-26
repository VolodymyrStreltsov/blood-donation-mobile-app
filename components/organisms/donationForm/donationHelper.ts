export const baseDonationNames: DonationName[] = ['Whole_blood', 'Platelets', 'Disqualification']

export const extendedDonationNames: DonationName[] = [
  'Plasma',
  'Erythrocytes',
  'Leukocytes',
  'Plasma_Platelets',
  'Erythrocytes_Platelets',
]

export const baseDonationIndicators: Indicator<BaseDonationInfo>[] = [
  { id: 'date' },
  { id: 'duration', unit: 'days' },
  { id: 'volume', unit: 'ml' },
  { id: 'blood_pressure', unit: 'mmHg' },
]

export const morphologyIndicators: Indicator<MorphologyIndicators>[] = [
  { id: 'Hb', unit: 'g/dL' },
  { id: 'Ht', unit: '%' },
  { id: 'MCV', unit: 'fL' },
  { id: 'MCH', unit: 'pg' },
  { id: 'MCHC', unit: 'g/dL' },
  { id: 'RDW', unit: '%' },
  { id: 'WBC', unit: '10^3/μL' },
  { id: 'PLT', unit: '10^3/μL' },
  { id: 'MPV', unit: 'fL' },
  { id: 'PCT', unit: '%' },
  { id: 'PDW', unit: '%' },
  { id: 'MO', unit: '%' },
]

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
      return '150'
    case 'Plasma_Platelets':
      return '800'
    case 'Erythrocytes_Platelets':
      return '450'
    default:
      return ' '
  }
}

export const useGetDonationDefaultValues = (nameOfDonation: DonationName) => {
  const defaultValues: Donation = {
    type: baseDonationNames.includes(nameOfDonation) ? nameOfDonation : extendedDonationNames[0],
    date: new Date().toISOString(),
    volume: getVolume(nameOfDonation),
    blood_pressure: '',
    duration: '',
    Hb: '',
    Ht: '',
    MCV: '',
    MCH: '',
    MCHC: '',
    RDW: '',
    WBC: '',
    PLT: '',
    MPV: '',
    PCT: '',
    PDW: '',
    MO: '',
  }

  return defaultValues
}
