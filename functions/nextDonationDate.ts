interface DonationEligibility {
  [from: string]: {
    [to: string]: number
  }
}

const donationEligibility: DonationEligibility = {
  Whole_blood: {
    Whole_blood: 56,
    Erythrocytes: 168,
    Platelets: 28,
    Plasma: 28,
  },
  Erythrocytes: {
    Whole_blood: 168,
    Erythrocytes: 168,
    Platelets: 84,
    Plasma: 84,
  },
  Platelets: {
    Whole_blood: 28,
    Erythrocytes: 28,
    Platelets: 28,
    Plasma: 28,
  },
  Plasma: {
    Whole_blood: 14,
    Erythrocytes: 28,
    Platelets: 28,
    Plasma: 14,
  },
  Plasma_Platelets: {
    Whole_blood: 84,
    Leukocytes: 84,
    Plasma: 7,
    Platelets: 7,
    Erythrocytes: 7,
  },
  Erythrocytes_Platelets: {
    Whole_blood: 84,
    Leukocytes: 84,
    Plasma: 56,
    Platelets: 56,
    Erythrocytes: 56,
  },
  Leukocytes: {
    Whole_blood: 84,
    Plasma: 84,
    Platelets: 84,
    Erythrocytes: 84,
    Leukocytes: 84,
  },
}

export const getEligibilityPeriodInDays = (
  lastDonation: DonationName,
  nextDonation: DonationName,
): number => {
  if (lastDonation === 'Disqualification') return 0
  const from = donationEligibility[lastDonation]
  if (!from) {
    console.error(`Unknown last donation type: ${lastDonation}`)
    return 0
  }
  const days = from[nextDonation]
  if (days === undefined) {
    console.error(`Unknown donation type: ${nextDonation}`)
    return 0
  }
  return days
}

// lastDonation === 'Whole_blood', nextDonation === 'Whole_blood', return 56
// lastDonation === 'Whole_blood', nextDonation === 'Erythrocytes', return 168
// lastDonation === 'Whole_blood', nextDonation === 'Platelets', return 28
// lastDonation === 'Whole_blood', nextDonation === 'Plasma', return 28

// lastDonation === 'Erythrocytes', nextDonation === 'Whole_blood', return 168
// lastDonation === 'Erythrocytes', nextDonation === 'Erythrocytes', return 168
// lastDonation === 'Erythrocytes', nextDonation === 'Platelets', return 84
// lastDonation === 'Erythrocytes', nextDonation === 'Plasma', return 84

// lastDonation === 'Platelets', nextDonation === 'Whole_blood', return 28
// lastDonation === 'Platelets', nextDonation === 'Erythrocytes', return 28
// lastDonation === 'Platelets', nextDonation === 'Platelets', return 28
// lastDonation === 'Platelets', nextDonation === 'Plasma', return 28

// lastDonation === 'Plasma', nextDonation === 'Whole_blood', return 14
// lastDonation === 'Plasma', nextDonation === 'Erythrocytes', return 28
// lastDonation === 'Plasma', nextDonation === 'Platelets', return  28
// lastDonation === 'Plasma', nextDonation === 'Plasma', return 14
