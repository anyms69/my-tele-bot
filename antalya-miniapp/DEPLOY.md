# 🚀 Деплой на GitHub Pages

## Шаг 1 — Имя репозитория в vite.config.js

Открой `vite.config.js` и замени `antalya-miniapp` на название своего репо:

```js
base: '/ТУТ-НАЗВАНИЕ-РЕПО/',
```

**Если репо называется `username.github.io`** — поставь просто:
```js
base: '/',
```

---

## Шаг 2 — Включить GitHub Pages через Actions

1. GitHub → репозиторий → **Settings** → **Pages**
2. Source: **GitHub Actions** (не Branch!)
3. Сохрани

---

## Шаг 3 — Добавить секреты (опционально)

Settings → **Secrets and variables** → **Actions** → New repository secret:

| Имя | Значение |
|-----|----------|
| `VITE_BOT_TOKEN` | токен от @BotFather |
| `VITE_OWNER_CHAT_ID` | твой Telegram ID |
| `VITE_PAYMENT_PROVIDER_TOKEN` | токен провайдера |
| `VITE_SHEETS_URL` | URL Apps Script |

---

## Шаг 4 — Запушить

```bash
git add .
git commit -m "deploy"
git push
```

GitHub Actions сам соберёт и задеплоит. Через ~2 минуты сайт появится по адресу:
`https://USERNAME.github.io/REPO-NAME/`

---

## Почему раньше была 404?

GitHub Pages не понимает SPA-роутинг — при переходе по прямой ссылке
ищет реальный файл, не находит, возвращает 404.

**Решение в этом проекте:**
- `public/404.html` — перехватывает 404, сохраняет URL в sessionStorage
- `index.html` — восстанавливает URL при загрузке
- `.github/workflows/deploy.yml` — правильная сборка через Vite
