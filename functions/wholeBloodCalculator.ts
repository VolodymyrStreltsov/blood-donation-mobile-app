export const calculateDonationAmount = (
  donations: { type: DonationName; volume: number }[],
): number => {
  let amount = 0
  donations.forEach((donation) => {
    switch (donation.type) {
      case 'Plasma':
        if (donation.volume === 600) {
          amount += 200
        }
        break
      case 'Platelets':
        if (donation.volume <= 500) {
          amount += 500
        } else {
          amount += 1000
        }
        break
      case 'Whole_blood':
        amount += donation.volume
        break
      case 'Erythrocytes':
        if (donation.volume <= 300) {
          amount += 500
        } else {
          amount += 1000
        }
        break
      case 'Leukocytes':
        if (donation.volume >= 150) {
          amount += 2000
        }
        break
      case 'Plasma_Platelets':
        if (donation.volume <= 800) {
          amount += 650
        } else {
          amount += 1000
        }
        break
      case 'Erythrocytes_Platelets':
        if (donation.volume >= 450) {
          amount += 1000
        }
        break
      case 'Disqualification':
        break
      default:
        console.error(`Unknown donation type: ${donation.type}`)
        break
    }
  })
  return amount
}

// type === 'Plasma', volume === 600, amount += 200
// type === 'Platelets', volume <= 500, amount += 500
// type === 'Platelets', volume > 500, amount += 1000
// type === 'Whole_blood', amount += volume
// type === 'Erythrocytes', volume <= 300, amount += 500
// type === 'Erythrocytes', volume > 300, amount += 1000
// type === 'Leukocytes', volume >= 150, amount += 2000
// type === 'Plasma_Platelets', volume <= 800, amount += 650
// type === 'Plasma_Platelets', volume > 800, amount += 1000
// type === 'Erythrocytes_Platelets', volume >= 450, amount += 1000
// type === 'Disqualification', amount += 0
