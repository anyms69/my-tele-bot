# 🌊 Antalya Mini App — Telegram Web App

Telegram Mini App для туристов в Анталии: **экскурсии**, **аренда авто**, **трансферы**, **яхты**.

## 🗺️ Стек

| Слой | Технология |
|------|-----------|
| Frontend | React 18 + Vite |
| UI | Tailwind CSS |
| State | Zustand |
| TG SDK | `@tma.js/sdk` |
| Иконки | Lucide React |
| Шрифты | Playfair Display + Nunito |

## 📁 Структура

```
src/
├── components/
│   ├── layout/
│   │   └── BottomNav.jsx       # Нижняя навигация
│   └── ui/
│       ├── Badge.jsx            # Бейджи (popular/hot/new)
│       ├── StarRating.jsx       # Рейтинг звёздами
│       ├── ExcursionCard.jsx    # Карточка экскурсии
│       ├── CarCard.jsx          # Карточка авто
│       └── LangSwitcher.jsx     # RU / EN / TR
├── data/
│   └── index.js                 # Моковые данные
├── hooks/
│   ├── useStore.js              # Zustand store
│   ├── useTelegram.js           # Telegram WebApp API
│   └── useTranslation.js        # i18n хук
├── i18n/
│   └── translations.js          # RU / EN / TR переводы
├── pages/
│   ├── HomePage.jsx             # ✅ Главный экран
│   ├── Placeholders.jsx         # 🚧 Заготовки страниц
│   └── (coming soon...)
├── App.jsx
├── main.jsx
└── index.css
```

## 🚀 Запуск

```bash
npm install
npm run dev
```

Открыть: http://localhost:3000

## 📦 Сборка для продакшн

```bash
npm run build
# dist/ → деплой на Vercel / Netlify / GitHub Pages
```

## 🔗 Деплой на GitHub Pages

```bash
npm run build
# Загрузи dist/ в ветку gh-pages
# В настройках репо: Settings → Pages → Source: gh-pages
```

## 📱 Регистрация в @BotFather

1. `/newbot` → создать бота
2. `/newapp` → Menu Button → URL вашего деплоя
3. Готово!

## 🔮 Роадмап

- [x] Home экран
- [ ] Страница экскурсий с фильтрами
- [ ] Страница аренды авто (поиск + бронирование)
- [ ] Мои брони (история)
- [ ] Telegram Payments
- [ ] Backend (Node.js + Supabase)
- [ ] Push-уведомления через бота

## 🎨 Дизайн

Средиземноморская тема: синий `#0c4a6e`, бирюзовый `#0d9488`, золотисто-песчаный акцент.
