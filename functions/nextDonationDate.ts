interface DonationEligibility {
  [from: string]: {
    [to: string]: number
  }
}

const donationEligibility: DonationEligibility = {
  Whole_blood: {
    Whole_blood: 56,
    Erythrocytes: 84,
    Platelets: 56,
    Plasma: 28,
    Leukocytes: 0,
  },
  Erythrocytes: {
    Whole_blood: 84,
    Erythrocytes: 168,
    Platelets: 28,
    Plasma: 28,
    Leukocytes: 0,
  },
  Platelets: {
    Whole_blood: 56,
    Erythrocytes: 84,
    Platelets: 28,
    Plasma: 28,
    Leukocytes: 0,
  },
  Plasma: {
    Whole_blood: 28,
    Erythrocytes: 84,
    Platelets: 28,
    Plasma: 14,
    Leukocytes: 0,
  },
  Plasma_Platelets: {
    Whole_blood: 56,
    Erythrocytes: 84,
    Platelets: 28,
    Plasma: 28,
    Leukocytes: 0,
  },
  Erythrocytes_Platelets: {
    Whole_blood: 84,
    Erythrocytes: 168,
    Platelets: 28,
    Plasma: 28,
    Leukocytes: 0,
  },
  Leukocytes: {
    Whole_blood: 1,
    Plasma: 1,
    Platelets: 1,
    Erythrocytes: 1,
    Leukocytes: 1,
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
