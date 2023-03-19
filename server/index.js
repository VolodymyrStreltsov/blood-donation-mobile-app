import cors from 'cors'
import express from 'express'
import sqlite3 from 'sqlite3'

const app = express()
const port = process.env.PORT || 3000
const appPort = 19000

const allowedOrigins = [`http://localhost:${appPort}`, `http://localhost:${port}`]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
  }),
)

const schema = `
    CREATE TABLE IF NOT EXISTS donations (
        id INTEGER PRIMARY KEY,
        type TEXT,
        date TEXT,
        volume INTEGER,
        blood_pressure TEXT,
        duration INTEGER,
        Hb REAL,
        Ht REAL,
        MCV REAL,
        MCH REAL,
        MCHC REAL,
        RDW REAL,
        WBC REAL,
        PLT REAL,
        MPV REAL,
        PCT REAL,
        PDW REAL,
        MO REAL
    )
`

// Connect to SQLite database
const db = new sqlite3.Database(
  'blooddonation.db',
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message)
    } else {
      console.log('Connected to the blood donation database.')
    }
  },
)

db.run(schema, (err) => {
  if (err) {
    console.error(err.message)
  } else {
    console.log('Table created successfully')
  }
})

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Blood Donation API')
})

app.get('/donations', async (req, res) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM donations', (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
    res.json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

app.post('/donations', async (req, res) => {
  try {
    const donation = req.body
    const stmt = await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO donations (id, type, date, volume, blood_pressure, duration, Hb, Ht, MCV, MCH, MCHC, RDW, WBC, PLT, MPV, PCT, PDW, MO) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        null,
        donation.baseDonationInfo.type,
        donation.baseDonationInfo.date,
        donation.baseDonationInfo.volume,
        donation.baseDonationInfo.blood_pressure,
        donation.baseDonationInfo.duration,
        donation.morphology.Hb,
        donation.morphology.Ht,
        donation.morphology.MCV,
        donation.morphology.MCH,
        donation.morphology.MCHC,
        donation.morphology.RDW,
        donation.morphology.WBC,
        donation.morphology.PLT,
        donation.morphology.MPV,
        donation.morphology.PCT,
        donation.morphology.PDW,
        donation.morphology.MO,
        function (error) {
          if (error) {
            reject(error)
          } else {
            resolve(this)
          }
        },
      )
    })
    const insertedId = stmt.lastID
    res.json({ success: true, insertedId })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Blood Donation API listening at http://localhost:${port}`)
})

// import fs from 'fs'
// import { OAuth2Client } from 'google-auth-library'

// // Authenticate with Google Drive API
// const CLIENT_ID = '<your_client_id>'
// const CLIENT_SECRET = '<your_client_secret>'
// const REDIRECT_URI = '<your_redirect_uri>'

// const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

// const SCOPES = ['https://www.googleapis.com/auth/drive.file']

// // Sync data with Google Drive
// function syncDataWithDrive() {
//   // Generate authorization URL
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   })

//   // Print authorization URL and prompt user to visit it
//   console.log(`Authorize this app by visiting this URL: ${authUrl}`)

//   // Wait for user to enter authorization code
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   })
//   rl.question('Enter the authorization code: ', (code) => {
//     rl.close()
//     // Exchange authorization code for access token
//     oAuth2Client
//       .getToken(code)
//       .then((token) => {
//         oAuth2Client.setCredentials(token)
//         // Create Drive API client
//         const drive = google.drive({ version: 'v3', auth: oAuth2Client })
//         // Upload SQLite database file to Google Drive
//         drive.files.create(
//           {
//             requestBody: {
//               name: 'blooddonation.db',
//               parents: ['<your_folder_id>'],
//             },
//             media: {
//               mimeType: 'application/vnd.sqlite3',
//               body: fs.createReadStream('blooddonation.db'),
//             },
//           },
//           (err, file) => {
//             if (err) {
//               console.error(err.message)
//             } else {
//               console.log('File uploaded to Google Drive:', file.data.id)
//             }
//           },
//         )
//       })
//       .catch((err) => {
//         console.error(err.message)
//       })
//   })
// }
