import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('bloodDonations.db')

const createDonationsTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS donations (id INTEGER PRIMARY KEY, type TEXT, date INTEGER, volume INTEGER, blood_pressure TEXT, duration INTEGER, Hb REAL, Ht REAL, MCV REAL, MCH REAL, MCHC REAL, RDW REAL, WBC REAL, PLT REAL, MPV REAL, PCT REAL, PDW REAL, MO REAL)',
      [],
      () => console.log('Donations table created successfully.'),
      (_tx, error) => {
        console.error('Error creating donations table', error.message)
        return true
      },
    )
  })
}

const createProfileTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY, gender TEXT, AB0 TEXT, RhD1 TEXT, RhD2 TEXT, KELL TEXT, Fy TEXT, MNS TEXT)',
      [],
      () => console.log('Profile table created successfully.'),
      (_tx, error) => {
        console.error('Error creating profile table', error.message)
        return true
      },
    )
  })
}

const createSettingsTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY, language TEXT, mode TEXT, firstLogin INTEGER)',
      [],
      () => console.log('Settings table created successfully.'),
      (_tx, error) => {
        console.error('Error creating settings table', error.message)
        return true
      },
    )
  })
}

export const initDB = () => {
  createDonationsTable()
  createProfileTable()
  createSettingsTable()
}

initDB()

export default db
