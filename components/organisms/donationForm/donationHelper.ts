export const donationHelper = (val: any) => {
  return {
    id: Math.random().toString(36).toString(),
    baseDonationInfo: {
      type: val.type,
      date: val.date,
      volume: val.volume,
      blood_pressure: val.blood_pressure,
      duration: val.duration,
    },
    morphology: {
      Hb: val.Hb,
      Ht: val.Ht,
      MCV: val.NCV,
      MCH: val.MCH,
      MCHC: val.MCHC,
      RDW: val.RDW,
      WBC: val.WBC,
      PLT: val.PLT,
      MPV: val.MPV,
      PCT: val.PCT,
      PDW: val.PDW,
      MO: val.MO,
    },
  }
}
