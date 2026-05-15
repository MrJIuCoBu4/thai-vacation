# Thai Vacation Countdown ✈️🌴

Неоновый лендинг с живым обратным отсчётом до поездки в Таиланд (22 июня 2026).

## Что внутри
- Таймер `дни / часы / минуты / секунды` (обновление каждую секунду)
- Анимированный фон и иконки (Motion)
- Два календаря (май + июнь 2026) с подсветкой текущего и целевого дня
- Адаптивная вёрстка под мобилу и десктоп

## Стек
- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Motion
- Lucide Icons

## Быстрый старт
```bash
npm install
npm run dev
```

Откроется на `http://localhost:3000`.

## Скрипты
```bash
npm run dev      # локальная разработка
npm run build    # production-сборка в dist/
npm run preview  # локальный просмотр production-сборки
npm run lint     # проверка TypeScript
```

## Деплой
Это обычный статический Vite-проект. После `npm run build` публикуется содержимое папки `dist/`.

Подходит для:
- Nginx
- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages

## Настройки
Сейчас дата цели захардкожена в `src/App.tsx`:
```ts
const TARGET_DATE = new Date('2026-06-22T00:00:00').getTime();
```

Если нужно, можно вынести в `.env`.

## Статус
Проект готов к публикации как лендинг-таймер.
