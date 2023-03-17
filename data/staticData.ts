export const BASE_DONATION_NAMES: DonationName[] = ['Whole_blood', 'Platelets', 'Disqualification']

export const EXTENDED_DONATION_NAMES: DonationName[] = [
  'Plasma',
  'Erythrocytes',
  'Leukocytes',
  'Plasma_Platelets',
]

export const NEXT_DONATIONS_DATA: DonationName[] = [
  'Whole_blood',
  'Platelets',
  'Plasma',
  'Erythrocytes',
  'Leukocytes',
]

export const BASE_DONATION_INDICATORS: Indicator<BaseDonationInfo>[] = [
  { id: 'date' },
  { id: 'duration' },
  { id: 'volume', unit: 'ml' },
  { id: 'blood_pressure', unit: 'mmHg' },
]

export const MORPHOLOGY_INDICATORS: Indicator<MorphologyIndicators>[] = [
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

export const INFO_SCREENS: infoScreenData[] = [
  {
    id: 'Whole_blood',
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

export const TOTAL_BLOOD_VOLUME: { id: string; volume: number }[] = []

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
    id: 'gender',
    value: 'male',
  },
]
