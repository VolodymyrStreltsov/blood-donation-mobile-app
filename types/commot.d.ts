type ThemeProps = {
  lightColor?: string
  darkColor?: string
}

type User = { name: string; email: string } | null

type RecordValue = string | number | Date

type DropdownType = { label: string; value: string }

type infoScreenData = { id: string; paragraphs: string[] }

interface AuthContextData {
  signIn: (user: User) => void
  signOut: () => void
  user: User
}

interface BaseDonationInfo {
  type: 'Whole_blood' | 'Plasma' | 'Platelets' | 'Disqualification'
  date: string | Date
  volume: string
  blood_pressure: string
  duration?: string
}

interface Morphology {
  Hb: RecordValue
  Ht: RecordValue
  MCV: RecordValue
  MCH: RecordValue
  MCHC: RecordValue
  RDW: RecordValue
  WBC: RecordValue
  PLT: RecordValue
  MPV: RecordValue
  PCT: RecordValue
  PDW: RecordValue
  MO: RecordValue
}

interface Profile {
  weight: RecordValue
  height: RecordValue
  BMI: RecordValue
  age: RecordValue
  gender: RecordValue
}

interface Indicator {
  id: keyof Morphology
  title: string
  unit?: string
  initVal: RecordValue
}

interface BaseDonationIndicator extends Omit<Indicator, 'id'> {
  id: keyof BaseDonationInfo
}

interface AddDonationFormDefaultValues {
  [key: string]: RecordValue | DropdownType
}

interface ProfileDataRecord {
  id: keyof Profile
  title: string
  unit?: string
  value: RecordValue
}

interface Donation {
  id: string
  baseDonationInfo: BaseDonationInfo
  morphology: Morphology
}

interface Achievement {
  id: string
  required: number
  title: string
  progress: number
  remainder: string
  img: string
}
