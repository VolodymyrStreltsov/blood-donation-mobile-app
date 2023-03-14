export const NEXT_DONATIONS_DATA: any[] = [
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
]

export const BASE_DONATION_INFO: BaseDonationIndicator[] = [
  { id: 'date', title: 'Date', initVal: new Date() },
  { id: 'duration', title: 'Duration', initVal: '0' },
  { id: 'volume', title: 'Volume', unit: 'ml', initVal: '450' },
  { id: 'blood_pressure', title: 'Blood Pressure', initVal: '0' },
]

export const MORPHOLOGY_INDICATORS: Indicator[] = [
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
]

export const DONATION_TYPES: DropdownType[] = [
  { label: 'Whole blood', value: 'Whole_blood' },
  { label: 'Plates', value: 'Plates' },
  { label: 'Plasma', value: 'Plasma' },
]

export const INFO_SCREENS: infoScreenData[] = [
  {
    id: 'Whole blood',
    paragraphs: [
      'Krew pełna jest pobierana nie częściej niż 6 razy w roku od mężczyzn i nie częściej niż 4 razy w roku od kobiet, z tym, że przerwa pomiędzy pobraniami musi wynosić 8 tygodni*;',
      'Jednorazowo od osoby ważącej co najmniej 50 kg lub więcej można pobrać 450± 45 ml krwi (1 jednostka);',
      'Jeżeli dawca został poddany zabiegowi aferezy, pobranie krwi pełnej może nastąpić najwcześniej po upływie 48 godzin od tego zabiegu, z wyjątkiem zabiegu erytroaferezy;',
      'Całkowita jednorazowa utrata krwinek czerwonych przez dawcę nie może przekroczyć wartości, która w warunkach izowolemicznych doprowadziłaby do obniżenia stężenia hemoglobiny u dawcy poniżej 110g/l (6,8mmol/l).',
    ],
  },
  {
    id: 'Platelets',
    paragraphs: [
      'Krew pełna jest pobierana nie częściej niż 6 razy w roku od mężczyzn i nie częściej niż 4 razy w roku od kobiet, z tym, że przerwa pomiędzy pobraniami musi wynosić 8 tygodni*;',
      'Jednorazowo od osoby ważącej co najmniej 50 kg lub więcej można pobrać 450± 45 ml krwi (1 jednostka);',
      'Jeżeli dawca został poddany zabiegowi aferezy, pobranie krwi pełnej może nastąpić najwcześniej po upływie 48 godzin od tego zabiegu, z wyjątkiem zabiegu erytroaferezy;',
      'Całkowita jednorazowa utrata krwinek czerwonych przez dawcę nie może przekroczyć wartości, która w warunkach izowolemicznych doprowadziłaby do obniżenia stężenia hemoglobiny u dawcy poniżej 110g/l (6,8mmol/l).',
    ],
  },
  {
    id: 'Plasma',
    paragraphs: [
      'Krew pełna jest pobierana nie częściej niż 6 razy w roku od mężczyzn i nie częściej niż 4 razy w roku od kobiet, z tym, że przerwa pomiędzy pobraniami musi wynosić 8 tygodni*;',
      'Jednorazowo od osoby ważącej co najmniej 50 kg lub więcej można pobrać 450± 45 ml krwi (1 jednostka);',
      'Jeżeli dawca został poddany zabiegowi aferezy, pobranie krwi pełnej może nastąpić najwcześniej po upływie 48 godzin od tego zabiegu, z wyjątkiem zabiegu erytroaferezy;',
      'Całkowita jednorazowa utrata krwinek czerwonych przez dawcę nie może przekroczyć wartości, która w warunkach izowolemicznych doprowadziłaby do obniżenia stężenia hemoglobiny u dawcy poniżej 110g/l (6,8mmol/l).',
    ],
  },
]

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first',
    title: `Odznaka Zasłużony Honorowy\nDawca Krwi za 5/6 litrów`,
    required: 6,
    progress: 1,
    remainder: '2',
    img: 'I',
  },
  {
    id: 'second',
    title: `Odznaka Zasłużony Honorowy\nDawca Krwi za 10/12 litrów`,
    required: 12,
    progress: 0.4,
    remainder: '5',
    img: 'I,',
  },
  {
    id: 'third',
    title: `Odznaka Zasłużony Honorowy\nDawca Krwi za 15/18 litrów`,
    required: 18,
    progress: 0.3,
    remainder: '10',
    img: 'I',
  },
  {
    id: 'fourth',
    required: 20,
    title: `Honorowy Dawca Krwi —\nZasłużony dla Zdrowia Narodu`,
    progress: 0.1,
    remainder: '16',
    img: 'I',
  },
]

export const PROFILE_DATA: ProfileDataRecord[] = [
  {
    id: 'weight',
    title: 'Weight',
    unit: 'kg',
    value: '0',
  },
  {
    id: 'height',
    title: 'Height',
    unit: 'cm',
    value: '0',
  },
  {
    id: 'age',
    title: 'Age',
    unit: 'years',
    value: '0',
  },
  {
    id: 'gender',
    title: 'Gender',
    unit: '',
    value: 'male',
  },
]
