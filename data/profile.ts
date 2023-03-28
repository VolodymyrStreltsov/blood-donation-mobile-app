import db from './database'

export const getProfile = async (): Promise<ProfileData | null> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT gender, height, weight, language, country FROM profile WHERE id = ?',
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

export const updateProfile = async (updatedProfile: ProfileData): Promise<void> => {
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql(
        'INSERT OR REPLACE INTO profile (id, gender, height, weight, language, country) VALUES (?, ?, ?, ?, ?, ?)',
        [
          1,
          updatedProfile.gender,
          updatedProfile.height,
          updatedProfile.weight,
          updatedProfile.language,
          updatedProfile.country,
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