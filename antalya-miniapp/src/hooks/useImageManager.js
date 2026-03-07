// ════════════════════════════════════════════════════════
//  useImageManager.js
//  Управление картинками для авто и экскурсий.
//
//  Поддерживает 3 способа хранения:
//  1. BASE64 в localStorage (по умолчанию, без сервера)
//  2. Google Drive через Apps Script (если VITE_SHEETS_URL задан)
//  3. Внешний URL (просто строка — для Google Sheets колонки image)
// ════════════════════════════════════════════════════════

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'antalya_images'
const MAX_SIZE_MB = 2
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

// ── Утилиты ──────────────────────────────────────────────

/** Сжать картинку до нужного размера через canvas */
async function compressImage(file, maxWidthPx = 900, qualityJpeg = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let w = img.width
        let h = img.height
        if (w > maxWidthPx) {
          h = Math.round((h * maxWidthPx) / w)
          w = maxWidthPx
        }
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL('image/jpeg', qualityJpeg))
      }
      img.onerror = reject
      img.src = e.target.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/** Читать localStorage без краша */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

/** Сохранить в localStorage */
function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return true
  } catch (e) {
    console.warn('[ImageManager] localStorage full or unavailable:', e)
    return false
  }
}

// ════════════════════════════════════════════════════════
//  Хук useImageManager
//  entityType: 'car' | 'excursion'
//  entityId:   number | string
// ════════════════════════════════════════════════════════
export function useImageManager(entityType, entityId) {
  const storageKey = `${entityType}_${entityId}`

  const [images, setImages] = useState([])     // { id, url, source: 'local'|'url', thumb }
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  // ── Загрузить сохранённые картинки при инициализации ──
  useEffect(() => {
    if (!entityId) return
    const all = loadFromStorage()
    setImages(all[storageKey] || [])
  }, [storageKey, entityId])

  // ── Добавить картинку из файла (сжать + сохранить) ────
  const addImageFromFile = useCallback(async (file) => {
    setError(null)

    // Проверки
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Только JPG, PNG, WebP')
      return null
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Максимум ${MAX_SIZE_MB} МБ`)
      return null
    }

    setUploading(true)
    try {
      const base64 = await compressImage(file)
      const newImg = {
        id: `img_${Date.now()}`,
        url: base64,
        source: 'local',
        thumb: base64,
        addedAt: new Date().toISOString(),
        fileName: file.name,
      }

      setImages((prev) => {
        const updated = [...prev, newImg]
        const all = loadFromStorage()
        all[storageKey] = updated
        saveToStorage(all)
        return updated
      })

      return newImg
    } catch (err) {
      setError('Ошибка при обработке файла')
      return null
    } finally {
      setUploading(false)
    }
  }, [storageKey])

  // ── Добавить картинку по URL ───────────────────────────
  const addImageFromUrl = useCallback((url) => {
    if (!url || !url.startsWith('http')) {
      setError('Некорректный URL')
      return null
    }

    const newImg = {
      id: `url_${Date.now()}`,
      url,
      source: 'url',
      thumb: url,
      addedAt: new Date().toISOString(),
    }

    setImages((prev) => {
      const updated = [...prev, newImg]
      const all = loadFromStorage()
      all[storageKey] = updated
      saveToStorage(all)
      return updated
    })

    return newImg
  }, [storageKey])

  // ── Удалить картинку ──────────────────────────────────
  const removeImage = useCallback((imgId) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== imgId)
      const all = loadFromStorage()
      all[storageKey] = updated
      saveToStorage(all)
      return updated
    })
  }, [storageKey])

  // ── Переставить порядок ───────────────────────────────
  const reorderImages = useCallback((fromIndex, toIndex) => {
    setImages((prev) => {
      const updated = [...prev]
      const [moved] = updated.splice(fromIndex, 1)
      updated.splice(toIndex, 0, moved)
      const all = loadFromStorage()
      all[storageKey] = updated
      saveToStorage(all)
      return updated
    })
  }, [storageKey])

  // ── Установить как главное фото (переместить в 0) ─────
  const setMainImage = useCallback((imgId) => {
    setImages((prev) => {
      const idx = prev.findIndex((img) => img.id === imgId)
      if (idx <= 0) return prev
      const updated = [...prev]
      const [main] = updated.splice(idx, 1)
      updated.unshift(main)
      const all = loadFromStorage()
      all[storageKey] = updated
      saveToStorage(all)
      return updated
    })
  }, [storageKey])

  // ── Получить главное фото (или fallback) ──────────────
  const getMainImage = useCallback((fallbackUrl = '') => {
    return images[0]?.url || fallbackUrl
  }, [images])

  return {
    images,
    uploading,
    error,
    addImageFromFile,
    addImageFromUrl,
    removeImage,
    reorderImages,
    setMainImage,
    getMainImage,
    count: images.length,
  }
}

// ════════════════════════════════════════════════════════
//  Компонент ImageUploader (встраиваемый)
// ════════════════════════════════════════════════════════
import { useRef } from 'react'
import { Camera, Link, X, Star, Plus, Upload } from 'lucide-react'

export function ImageUploader({ entityType, entityId, fallbackUrl, lang = 'ru' }) {
  const mgr = useImageManager(entityType, entityId)
  const fileRef = useRef(null)
  const [urlInput, setUrlInput] = useState('')
  const [showUrlInput, setShowUrlInput] = useState(false)

  const allImages = [
    ...(mgr.images.length === 0 && fallbackUrl
      ? [{ id: 'fallback', url: fallbackUrl, source: 'fallback' }]
      : []),
    ...mgr.images,
  ]

  const L = {
    ru: { add: 'Добавить фото', upload: 'Загрузить файл', url: 'Вставить URL', urlPh: 'https://...', save: 'Добавить', main: 'Главное', del: 'Удалить', drag: 'Перетащить чтобы изменить порядок' },
    en: { add: 'Add photo', upload: 'Upload file', url: 'Paste URL', urlPh: 'https://...', save: 'Add', main: 'Main', del: 'Delete', drag: 'Drag to reorder' },
    tr: { add: 'Fotoğraf ekle', upload: 'Dosya yükle', url: 'URL yapıştır', urlPh: 'https://...', save: 'Ekle', main: 'Ana', del: 'Sil', drag: 'Sıralamak için sürükle' },
  }[lang] || {}

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (file) await mgr.addImageFromFile(file)
    e.target.value = ''
  }

  const handleUrl = () => {
    if (urlInput.trim()) {
      mgr.addImageFromUrl(urlInput.trim())
      setUrlInput('')
      setShowUrlInput(false)
    }
  }

  return (
    <div className="space-y-3">
      {/* Галерея */}
      {allImages.length > 0 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {allImages.map((img, idx) => (
            <div key={img.id} className="relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden group">
              <img src={img.url} alt="" className="w-full h-full object-cover" />

              {/* Оверлей при hover */}
              {img.source !== 'fallback' && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                  {idx !== 0 && (
                    <button onClick={() => mgr.setMainImage(img.id)}
                      className="bg-yellow-400 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Star size={8} /> {L.main}
                    </button>
                  )}
                  <button onClick={() => mgr.removeImage(img.id)}
                    className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <X size={8} /> {L.del}
                  </button>
                </div>
              )}

              {/* Метка главного */}
              {idx === 0 && img.source !== 'fallback' && (
                <div className="absolute top-1 left-1 bg-yellow-400 text-black text-[8px] font-bold px-1 py-0.5 rounded-full flex items-center gap-0.5">
                  <Star size={7} fill="black" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Кнопки добавления */}
      <div className="flex gap-2 flex-wrap">
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp"
          onChange={handleFile} className="hidden" />

        <button onClick={() => fileRef.current?.click()} disabled={mgr.uploading}
          className="flex items-center gap-1.5 bg-sea-50 border border-sea-200 text-sea-700 font-body font-semibold text-xs px-3 py-2 rounded-xl hover:bg-sea-100 active:scale-95 transition-all disabled:opacity-50">
          {mgr.uploading
            ? <><Upload size={13} className="animate-bounce" /> Загрузка...</>
            : <><Camera size={13} /> {L.upload}</>}
        </button>

        <button onClick={() => setShowUrlInput(!showUrlInput)}
          className="flex items-center gap-1.5 bg-sea-50 border border-sea-200 text-sea-700 font-body font-semibold text-xs px-3 py-2 rounded-xl hover:bg-sea-100 active:scale-95 transition-all">
          <Link size={13} /> {L.url}
        </button>
      </div>

      {/* URL input */}
      {showUrlInput && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder={L.urlPh}
            className="flex-1 border border-sea-200 rounded-xl px-3 py-2 font-body text-xs focus:outline-none focus:ring-2 focus:ring-sea-300"
            onKeyDown={(e) => e.key === 'Enter' && handleUrl()}
          />
          <button onClick={handleUrl}
            className="bg-sea-600 text-white font-body font-bold text-xs px-3 py-2 rounded-xl active:scale-95 transition-all">
            <Plus size={14} />
          </button>
        </div>
      )}

      {/* Ошибка */}
      {mgr.error && (
        <p className="text-red-500 font-body text-xs">⚠️ {mgr.error}</p>
      )}
    </div>
  )
}
