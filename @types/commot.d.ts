type ThemeProps = {
  lightColor?: string
  darkColor?: string
}

type DonationName =
  | 'Whole_blood'
  | 'Platelets'
  | 'Disqualification'
  | 'Plasma'
  | 'Erythrocytes'
  | 'Leukocytes'
  | 'Plasma_Platelets'
  | 'Erythrocytes_Platelets'
  | 'Donation'

interface MorphologyIndicators {
  Hb: string
  Ht: string
  MCV: string
  MCH: string
  MCHC: string
  RDW: string
  WBC: string
  PLT: string
  MPV: string
  PCT: string
  PDW: string
  MO: string
}

interface BaseDonationInfo {
  type: DonationName
  date: number | Date | string
  volume: string
  blood_pressure: string
  duration?: string
}

interface ProfileData {
  language: 'pl' | 'en' | 'ua' | 'ru'
  gender: string
  height: string
  weight: string
}

interface Indicator<T> {
  id: keyof T
  unit?: string
}

interface Donation extends BaseDonationInfo, MorphologyIndicators {
  id?: string
}

interface Achievement {
  id: string
  required: number
}
