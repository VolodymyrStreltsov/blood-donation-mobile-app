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

type ProfileFields = 'gender' | 'AB0' | 'RhD1' | 'RhD2' | 'KELL' | 'Fy' | 'MNS'

interface FrontProfileData {
  gender: string
  AB0: string
  RhD1: string
  KELL: string
  Cw: boolean
  C: boolean
  c: boolean
  E: boolean
  e: boolean
  a: boolean
  b: boolean
  M: boolean
  N: boolean
  S: boolean
  s: boolean
}

interface DBProfileData {
  gender: string
  AB0: string
  RhD1: string
  RhD2: string
  KELL: string
  Fy: string
  MNS: string
}

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

interface SettingsData {
  language: string
  mode: string
  firstLogin: number
}
