import db from './database'

export const getSettings = async (): Promise<SettingsData | null> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT language, mode, firstLogin FROM settings WHERE id = ?',
        [1],
        (_tx, results) => {
          if (results.rows.length > 0) {
            console.log('settings retrieved successfully', results.rows.item(0))
            resolve(results.rows.item(0))
          } else {
            console.log('No settings data found')
            resolve(null)
          }
        },
        (_tx, error) => {
          console.error('Error retrieving settings', error.message)
          reject(error)
          return true
        },
      )
    })
  })
}

export const updateSettings = async (updatedSettings: SettingsData): Promise<void> => {
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql(
        'INSERT OR REPLACE INTO settings (id, language, mode ) VALUES (?, ?, ?)',
        [1, updatedSettings.language, updatedSettings.mode],
        (_tx, results) => {
          console.log('Settings updated successfully', results.rowsAffected)
        },
      )
    })
  } catch (error: any) {
    console.error('Error updating Settings', error.message)
    throw error
  }
}

export const setFirstLogin = async (): Promise<void> => {
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql(
        'INSERT OR REPLACE INTO settings (id, firstLogin ) VALUES (?, ?)',
        [1, 1],
        (_tx, results) => {
          console.log('First login updated successfully', results.rowsAffected)
        },
      )
    })
  } catch (error: any) {
    console.error('Error updating First login', error.message)
    throw error
  }
}
