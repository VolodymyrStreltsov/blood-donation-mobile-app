import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('bloodDonations.db')

const initDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS donations (id INTEGER PRIMARY KEY, type TEXT, date INTEGER, volume INTEGER, blood_pressure TEXT, duration INTEGER, Hb REAL, Ht REAL, MCV REAL, MCH REAL, MCHC REAL, RDW REAL, WBC REAL, PLT REAL, MPV REAL, PCT REAL, PDW REAL, MO REAL)',
      [],
      () => console.log('Donations table created successfully.'),
      (_tx, error) => {
        throw new Error(error.message)
      },
    )
  })
}

initDB()

export const addDonation = (donation: Donation) => {
  db.transaction((tx) => {
    tx.executeSql(
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
      (_tx, error) => {
        throw new Error(error.message)
      },
    )
  })
}

export const getDonationById = (id: string): any => {
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
          throw new Error(error.message)
        },
      )
    })
  })
}

export const deleteDonation = (id: string) => {
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
          throw new Error(error.message)
        },
      )
    })
  })
}

export const getAllDonations = () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM donations ORDER BY date DESC',
        [],
        (_tx, results) => {
          resolve(results.rows._array)
        },
        (_tx, error) => {
          throw new Error(error.message)
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
        throw new Error(error.message)
      },
    )
  })
}

export default db
