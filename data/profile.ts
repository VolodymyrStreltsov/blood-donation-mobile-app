import db from './database'

export const getProfile = async (): Promise<DBProfileData | null> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT gender, AB0, RhD1, RhD2, KELL, Fy, MNS FROM profile WHERE id = ?',
        [1],
        (_tx, results) => {
          if (results.rows.length > 0) {
            console.log('Profile retrieved successfully', results.rows.item(0))
            resolve(results.rows.item(0))
          } else {
            console.log('No profile data found')
            resolve(null)
          }
        },
        (_tx, error) => {
          console.error('Error retrieving profile', error.message)
          reject(error)
          return true
        },
      )
    })
  })
}

export const updateProfile = async (updatedProfile: DBProfileData): Promise<void> => {
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql(
        'INSERT OR REPLACE INTO profile (id, gender, AB0, RhD1, RhD2, KELL, Fy, MNS) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          1,
          updatedProfile.gender,
          updatedProfile.AB0,
          updatedProfile.RhD1,
          updatedProfile.RhD2,
          updatedProfile.KELL,
          updatedProfile.Fy,
          updatedProfile.MNS,
        ],
        (_tx, results) => {
          console.log('Profile updated successfully', results.rowsAffected)
        },
      )
    })
  } catch (error: any) {
    console.error('Error updating profile', error.message)
    throw error
  }
}

export const getGender = async (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT gender FROM profile WHERE id = ?',
        [1],
        (_tx, results) => {
          if (results.rows.length > 0) {
            console.log('Gender retrieved successfully', results.rows.item(0).gender)
            resolve(results.rows.item(0).gender)
          } else {
            console.log('No gender data found')
            resolve(null)
          }
        },
        (_tx, error) => {
          console.error('Error retrieving gender', error.message)
          reject(error)
          return true
        },
      )
    })
  })
}
