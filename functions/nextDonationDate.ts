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
    Leukocytes: 0,
  },
  Erythrocytes: {
    Whole_blood: 168,
    Erythrocytes: 168,
    Platelets: 84,
    Plasma: 84,
    Leukocytes: 0,
  },
  Platelets: {
    Whole_blood: 28,
    Erythrocytes: 28,
    Platelets: 28,
    Plasma: 28,
    Leukocytes: 0,
  },
  Plasma: {
    Whole_blood: 14,
    Erythrocytes: 28,
    Platelets: 28,
    Plasma: 14,
    Leukocytes: 0,
  },
  Plasma_Platelets: {
    Whole_blood: 84,
    Leukocytes: 0,
    Plasma: 7,
    Platelets: 7,
    Erythrocytes: 7,
  },
  Erythrocytes_Platelets: {
    Whole_blood: 84,
    Leukocytes: 0,
    Plasma: 56,
    Platelets: 56,
    Erythrocytes: 56,
  },
  Leukocytes: {
    Whole_blood: 84,
    Plasma: 84,
    Platelets: 84,
    Erythrocytes: 84,
    Leukocytes: 0,
  },
}

export const getEligibilityPeriodInDays = (
  lastDonation: DonationName,
  nextDonation: DonationName,
): number => {
  if (lastDonation === 'Disqualification') return 0
  if (lastDonation === null) return 0
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
