// ════════════════════════════════════════════════════════
//  GOOGLE APPS SCRIPT — вставить в Расширения → Apps Script
//  Таблица → Развернуть → Веб-приложение → Доступ: Все
//  Скопируй URL → .env → VITE_SHEETS_URL=...
//
//  ЛИСТЫ В ТАБЛИЦЕ:
//  1. "Экскурсии"   — туры
//  2. "Авто"        — автомобили
//  3. "Бронирования"— заявки (создаётся автоматически)
// ════════════════════════════════════════════════════════

const SHEET_EXCURSIONS = 'Экскурсии'
const SHEET_CARS       = 'Авто'
const SHEET_BOOKINGS   = 'Бронирования'

function doGet(e) {
  const action = e.parameter.action
  if (action === 'getExcursions') return getSheet(SHEET_EXCURSIONS)
  if (action === 'getCars')       return getSheet(SHEET_CARS)
  return jsonResponse({ success: false, error: 'Unknown action' })
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents)
    if (body.action === 'addBooking') return addBooking(body)
    return jsonResponse({ success: false, error: 'Unknown action' })
  } catch (err) {
    return jsonResponse({ success: false, error: err.message })
  }
}

function getSheet(sheetName) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet()
    const sheet = ss.getSheetByName(sheetName)
    if (!sheet) return jsonResponse({ success: false, error: `Лист "${sheetName}" не найден` })
    const rows = sheet.getDataRange().getValues()
    const headers = rows[0]
    const data = []
    for (let i = 1; i < rows.length; i++) {
      const row = {}
      headers.forEach((h, j) => { row[h] = rows[i][j] })
      if (row['active'] !== false && row['active'] !== 'FALSE' && row['id']) {
        data.push(row)
      }
    }
    return jsonResponse({ success: true, data })
  } catch (err) {
    return jsonResponse({ success: false, error: err.message })
  }
}

function addBooking(data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet()
    let sheet = ss.getSheetByName(SHEET_BOOKINGS)
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_BOOKINGS)
      sheet.appendRow([
        'timestamp','type','name','phone','telegram_id','telegram_username',
        'item_id','item_title','date','adults','children',
        'extras','total_price','currency','status','notes'
      ])
    }
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.type      || 'excursion',    // excursion | car
      data.name      || '',
      data.phone     || '',
      data.telegram_id || '',
      data.telegram_username || '',
      data.item_id   || '',
      data.item_title || '',
      data.date      || '',
      data.adults    || 1,
      data.children  || 0,
      JSON.stringify(data.extras || []),
      data.total_price || 0,
      data.currency  || 'USD',
      'new',
      data.notes     || '',
    ])
    // Раскомментируй для email-уведомлений:
    // MailApp.sendEmail('ваш@email.com', '🔔 Новая заявка', JSON.stringify(data, null, 2))
    return jsonResponse({ success: true })
  } catch (err) {
    return jsonResponse({ success: false, error: err.message })
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
}

// ────────────────────────────────────────────────────────
//  ЗАГОЛОВКИ ЛИСТА "Экскурсии" (скопируй в первую строку):
//  id | slug | active | category | badge | image |
//  title_ru | title_en | title_tr |
//  shortDesc_ru | shortDesc_en | shortDesc_tr |
//  fullDesc_ru | fullDesc_en | fullDesc_tr |
//  highlights_ru | highlights_en | highlights_tr |
//  price_adult | price_child | price_childAge | price_infant | price_infantAge |
//  currency | duration_hours | duration_label_ru | duration_label_en | duration_label_tr |
//  distance_km | departure | returnTime |
//  schedule_ru | schedule_en | schedule_tr |
//  included_ru | included_en | included_tr |
//  notIncluded_ru | notIncluded_en | notIncluded_tr |
//  tip_ru | tip_en | tip_tr |
//  rating | reviews
//
//  ЗАГОЛОВКИ ЛИСТА "Авто":
//  id | slug | active | type | badge |
//  image | customImages |
//  brand | model | generation | year |
//  transmission | fuel | seats | doors | luggage |
//  ac | engine | power |
//  shortDesc_ru | shortDesc_en | shortDesc_tr |
//  features_ru | features_en | features_tr |
//  priceDay | priceWeek | deposit | currency |
//  extras_ru | extras_en | extras_tr |
//  included_ru | included_en | included_tr |
//  notIncluded_ru | notIncluded_en | notIncluded_tr |
//  requirements_ru | requirements_en | requirements_tr |
//  tip_ru | tip_en | tip_tr |
//  rating | reviews
// ────────────────────────────────────────────────────────
