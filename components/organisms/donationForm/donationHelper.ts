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
