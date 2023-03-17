export const donationHelper = (val: any, id?: string) => {
  return {
    id: id || Math.random().toString(36).toString(),
    baseDonationInfo: {
      type: val.type,
      date: val.date,
      volume: val.volume?.trim(),
      blood_pressure: val.blood_pressure?.trim(),
      duration: val.duration?.trim(),
    },
    morphology: {
      Hb: val.Hb?.trim(),
      Ht: val.Ht?.trim(),
      MCV: val.NCV?.trim(),
      MCH: val.MCH?.trim(),
      MCHC: val.MCHC?.trim(),
      RDW: val.RDW?.trim(),
      WBC: val.WBC?.trim(),
      PLT: val.PLT?.trim(),
      MPV: val.MPV?.trim(),
      PCT: val.PCT?.trim(),
      PDW: val.PDW?.trim(),
      MO: val.MO?.trim(),
    },
  }
} // TODO

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

export const getBaseValue = (
  obj: BaseDonationInfo,
  id: keyof BaseDonationInfo,
  type: DonationName,
) => {
  if (obj[id]) return obj[id]
  else if (id === 'volume') return getVolume(type)
  else if (id === 'date') return new Date()
  else return ' '
}

export const getMorphologyValue = (obj: MorphologyIndicators, id: keyof MorphologyIndicators) => {
  return obj[id] || ' '
}
