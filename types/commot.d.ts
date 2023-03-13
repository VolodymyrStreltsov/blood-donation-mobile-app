type ThemeProps = {
  lightColor?: string
  darkColor?: string
}

type User = { name: string; email: string } | null

type RecordValue = string | number | Date

type DropdownType = { label: string; value: string }

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

interface Donation {
  id: string
  baseDonationInfo: BaseDonationInfo
  morphology: Morphology
}
