# 🚀 Деплой на GitHub Pages — пошагово

## Способ 1 — Автоматически через GitHub Actions (рекомендую)

### Шаг 1. Узнай имя своего репозитория

Открой свой репо на GitHub. URL выглядит так:
`https://github.com/USERNAME/REPO-NAME`

Запомни `REPO-NAME`.

---

### Шаг 2. Добавь переменную VITE_BASE_PATH

GitHub → репозиторий → **Settings** → **Secrets and variables** → **Actions** → вкладка **Variables** → **New repository variable**:

| Name | Value |
|------|-------|
| `VITE_BASE_PATH` | `/REPO-NAME/` |

Например если репо `my-antalya` → значение `/my-antalya/`
Если репо `username.github.io` → значение `/`

---

### Шаг 3. Включи GitHub Pages через Actions

GitHub → репозиторий → **Settings** → **Pages**:
- Source: **GitHub Actions** ← важно именно это, не Branch!

---

### Шаг 4. Запушь проект

```bash
git add .
git commit -m "initial deploy"
git push
```

GitHub Actions запустится автоматически. Через 2–3 минуты сайт будет по адресу:
`https://USERNAME.github.io/REPO-NAME/`

---

## Способ 2 — Вручную через gh-pages

```bash
# 1. Установить зависимости
npm install

# 2. Собрать с правильным base path
VITE_BASE_PATH=/REPO-NAME/ npm run build

# 3. Задеплоить
npm run deploy
```

Затем:
GitHub → Settings → Pages → Source: **Deploy from branch** → branch: **gh-pages** → folder: **/ (root)**

---

## Частые ошибки

| Ошибка | Причина | Решение |
|--------|---------|---------|
| Белый экран | Неправильный base path | Проверь VITE_BASE_PATH |
| 404 на главной | Pages не включён | Settings → Pages → Source: GitHub Actions |
| Actions падает | Нет прав у workflow | Settings → Actions → General → Workflow permissions → Read and write |

