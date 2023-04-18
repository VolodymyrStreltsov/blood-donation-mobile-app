import { calculateDonationAmount, getEligibilityPeriodInDays } from '../functions'

import db from './database'
import { getGender } from './profile'

export const addDonation = async (donation: Donation) => {
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql(
        'INSERT INTO donations (type, date, volume, blood_pressure, duration, Hb, Ht, MCV, MCH, MCHC, RDW, WBC, PLT, MPV, PCT, PDW, MO) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          donation.type,
          new Date(donation.date).getTime(),
          donation.volume || 0,
          donation.blood_pressure,
          donation.duration || 0,
          donation.Hb,
          donation.Ht,
          donation.MCV,
          donation.MCH,
          donation.MCHC,
          donation.RDW,
          donation.WBC,
          donation.PLT,
          donation.MPV,
          donation.PCT,
          donation.PDW,
          donation.MO,
        ],
        (_tx, results) => {
          console.log('Record added with ID: ' + results.insertId)
        },
      )
    })
  } catch (error: any) {
    console.error('Error adding donation', error.message)
    throw error
  }
}

export const getDonationById = (id: string): Promise<Donation | null> => {
  console.log('Getting donation with ID: ', id)
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM donations WHERE id = ?',
        [id],
        (_tx, results) => {
          if (results.rows.length > 0) {
            resolve(results.rows.item(0))
          } else {
            resolve(null)
          }
        },
        (_tx, error) => {
          console.error('Error creating donations table', error.message)
          return true
        },
      )
    })
  })
}

export const deleteDonation = (id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM donations WHERE id = ?',
        [id],
        (_tx, results) => {
          if (results.rowsAffected > 0) {
            resolve(`Donation with ID ${id} has been deleted`)
          } else {
            reject(`No donation found with ID ${id}`)
          }
        },
        (_tx, error) => {
          console.error('Error creating donations table', error.message)
          return true
        },
      )
    })
  })
}

export const getAllDonations = (): Promise<Partial<Donation>[]> => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT type, id, date, volume FROM donations ORDER BY date DESC',
        [],
        (_tx, results) => {
          resolve(results.rows._array)
        },
        (_tx, error) => {
          console.error('Error creating donations table', error.message)
          return true
        },
      )
    })
  })
}

export const updateDonation = (id: string, updatedDonation: Donation) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE donations SET type = ?, date = ?, volume = ?, blood_pressure = ?, duration = ?, Hb = ?, Ht = ?, MCV = ?, MCH = ?, MCHC = ?, RDW = ?, WBC = ?, PLT = ?, MPV = ?, PCT = ?, PDW = ?, MO = ? WHERE id = ?',
      [
        updatedDonation.type,
        new Date(updatedDonation.date).getTime(),
        updatedDonation.volume || 0,
        updatedDonation.blood_pressure,
        updatedDonation.duration || 0,
        updatedDonation.Hb,
        updatedDonation.Ht,
        updatedDonation.MCV,
        updatedDonation.MCH,
        updatedDonation.MCHC,
        updatedDonation.RDW,
        updatedDonation.WBC,
        updatedDonation.PLT,
        updatedDonation.MPV,
        updatedDonation.PCT,
        updatedDonation.PDW,
        updatedDonation.MO,
        id,
      ],
      (_tx, results) => {
        console.log(`Record ${id} changed`, results.rowsAffected)
      },
      (_tx, error) => {
        console.error('Error creating donations table', error.message)
        return true
      },
    )
  })
}

export const getDonationsAmount = async (): Promise<number> => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT type, volume FROM donations',
        [],
        (_tx, results) => {
          if (results.rows.length > 0) {
            const amount = calculateDonationAmount(results.rows._array)
            console.log('Total donation amount:', amount)
            resolve(amount)
          } else {
            console.log('No donations found')
            resolve(0)
          }
        },
        (_tx, error) => {
          console.error('Error creating donations table', error.message)
          return true
        },
      )
    })
  })
}

const getLastDisqualification = async (): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM donations WHERE type='Disqualification' ORDER BY date DESC LIMIT 1",
        [],
        async (_tx, result) => {
          const disqualification = result.rows.item(0)
          if (!disqualification) {
            resolve(0)
          } else {
            const { duration, date } = disqualification
            const disqualificationEndDate = date + duration * 24 * 60 * 60 * 1000
            const now = Date.now()
            if (now > disqualificationEndDate) {
              resolve(0)
            } else {
              const remainingTime = disqualificationEndDate - now
              const remainingDays = Math.ceil(remainingTime / (24 * 60 * 60 * 1000))
              resolve(remainingDays)
            }
          }
        },
        (_tx, error) => {
          console.error('Error getting last disqualification', error.message)
          reject(error)
          return true
        },
      )
    })
  })
}

export const getLastDonationWithType = (type: DonationName): Promise<Donation> => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT type, MAX(date) as date, id FROM donations WHERE type = '${type}'`,
        [],
        (_tx, result) => {
          const lastDonation = result.rows.item(0)
          if (!lastDonation) {
            resolve({} as Donation)
          } else {
            resolve(lastDonation)
          }
        },
        (_tx, error) => {
          console.error('Error creating donations table', error.message)
          return true
        },
      )
    })
  })
}

const getLastDonation = (): Promise<Donation> => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT type, MAX(date) as date FROM donations WHERE type != 'disqualification'`,
        [],
        (_tx, result) => {
          const lastDonation = result.rows.item(0)
          if (!lastDonation) {
            resolve({} as Donation)
          } else {
            resolve(lastDonation)
          }
        },
        (_tx, error) => {
          console.error('Error creating donations table', error.message)
          return true
        },
      )
    })
  })
}

const getWholeBlood_LastTwelveMonth = async (): Promise<number> => {
  return new Promise((resolve) => {
    const twelveMonthsAgo = new Date()
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)
    const query = `SELECT COUNT(*) AS count, MIN(date) AS firstDate, MAX(date) AS lastDate, MAX(date) AS lastDonation FROM donations WHERE type = 'Whole_blood' AND date >= ${twelveMonthsAgo.getTime()}`
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (_tx, result) => {
          const { count, firstDate, lastDate } = result.rows.item(0)
          if (count >= 4) {
            const today = new Date().getTime()
            const daysSinceFirstDonation = today - firstDate
            const daysToNextDonation =
              Math.ceil(31536000000 - daysSinceFirstDonation) / (24 * 60 * 60 * 1000)
            resolve(daysToNextDonation)
          } else {
            const nextDate = lastDate + 56 * 24 * 60 * 60 * 1000
            const timeDiff = nextDate - new Date().getTime() // TODO check if this is correct
            const daysUntilNext = Math.ceil(timeDiff / (1000 * 3600 * 24))
            resolve(daysUntilNext)
          }
        },
        (_tx, error) => {
          console.error(error.message)
          return true
        },
      )
    })
  })
}

export const getNextDonationsDate = async (): Promise<Record<DonationName, number>> => {
  const nextDonations: Record<string, number> = {
    Whole_blood: 0,
    Platelets: 0,
    Plasma: 0,
    Erythrocytes: 0,
    Leukocytes: 0,
  }

  const gender = await getGender()
  const disqualification = await getLastDisqualification()
  const lastDonation = await getLastDonation()

  for (const nextDonation of Object.keys(nextDonations) as DonationName[]) {
    if (nextDonation === 'Whole_blood' && gender === 'female') {
      const value = await getWholeBlood_LastTwelveMonth()
      if (value < 0) {
        const eligibilityPeriodInDays = getEligibilityPeriodInDays(lastDonation?.type, nextDonation)
        nextDonations[nextDonation] = Math.ceil(Math.max(disqualification, eligibilityPeriodInDays))
      } else {
        nextDonations[nextDonation] = Math.ceil(Math.max(disqualification, value))
      }
    } else {
      const eligibilityPeriodInDays = getEligibilityPeriodInDays(lastDonation?.type, nextDonation)
      const nextDate = +lastDonation.date + eligibilityPeriodInDays * 24 * 60 * 60 * 1000
      const timeDiff = nextDate - new Date().getTime()

      const daysUntilNext = Math.ceil(Math.max(disqualification, timeDiff / (1000 * 3600 * 24)))
      nextDonations[nextDonation] = daysUntilNext
    }
  }

  return nextDonations
}
