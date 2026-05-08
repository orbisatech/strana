import { google } from 'googleapis'

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Hoja 1!A2:E',
    })

    const rows = res.data.values || []
    const data = rows.map(row => ({
      tarjeta: row[0] || '',
      nombre: row[1] || '',
      fecha_nacimiento: row[2] || '',
      telefono: row[3] || '',
      timestamp: row[4] || '',
    }))

    return Response.json({ data })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}