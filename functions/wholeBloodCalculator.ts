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
