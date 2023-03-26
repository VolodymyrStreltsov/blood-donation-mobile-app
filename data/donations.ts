import { getEligibilityPeriodInDays } from '../functions/nextDonationDate'
import { calculateDonationAmount } from '../functions/wholeBloodCalculator'
import db from './database'

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
  return new Promise((resolve, reg) => {
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

export const getNextDonationDate = async (nextDonation: DonationName): Promise<Date | null> => {
  const getLastDonationQuery = 'SELECT type, MAX(date) as lastDate, duration FROM donations'
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        getLastDonationQuery,
        [],
        (_tx, result) => {
          const lastDonation = result.rows.item(0)
          if (!lastDonation) {
            resolve(null)
          } else {
            const { type, lastDate, duration } = lastDonation
            const eligibilityPeriodInDays =
              type === 'Disqualification'
                ? duration
                : getEligibilityPeriodInDays(type, nextDonation)
            if (!eligibilityPeriodInDays) {
              resolve(null)
            } else {
              const nextDate = new Date(lastDate + eligibilityPeriodInDays * 24 * 60 * 60 * 1000)
              resolve(nextDate)
            }
          }
        },
        (_tx, error) => {
          console.error('Error getting last donation', error.message)
          return true
        },
      )
    })
  })
}
