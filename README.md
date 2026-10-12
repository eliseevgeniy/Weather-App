# Weather App — приложение для отображения погоды

SPA на React + TypeScript для просмотра текущей погоды и прогноза на 7 дней
в избранных городах. Данные берутся из открытого API [Open-Meteo](https://open-meteo.com/).

## Стек

- **React 18** + **TypeScript**
- **React Bootstrap** (Card, Table, Container, Row, Col, Button, Spinner, Form, ListGroup)
- **SCSS** (препроцессор `sass`)
- **React Router DOM v6** — маршрутизация между страницами
- **Create React App** — сборка проекта
- **Open-Meteo API** — геокодинг и данные о погоде

## Установка и запуск

```bash
# 1. Установить зависимости
npm install

# 2. Запустить dev-сервер
npm start
```

Приложение откроется автоматически по адресу [http://localhost:3000](http://localhost:3000).

### Сборка production-версии

```bash
npm run build
```

Готовые файлы появятся в папке `build/`.

## ⚠️ Важно

API `open-meteo.com` **недоступен на территории РФ без VPN**. Если карточки
показывают «Нет данных» — включите VPN и обновите страницу.

## Функциональность

### Главная страница (`/`)

- Заголовок «Погода в избранных городах».
- Компонент **AutocompleteInput** — автодополнение названий городов
  по мере ввода (debounce 300 мс, запрос к geocoding API).
- **6 карточек** с текущей погодой для городов:
  Moscow, St Petersburg, Rostov-on-Don, Vladivostok, Krasnodar, Yekaterinburg.
- Адаптивная сетка Bootstrap Grid:
  - **3 карточки в ряд** — на широких экранах (`lg`)
  - **2 карточки в ряд** — на средних (`md`)
  - **1 карточка в ряд** — на мобильных (`xs`)
- Каждая карточка делает **2 запроса**:
  1. `https://geocoding-api.open-meteo.com/v1/search?name=<city>` — координаты города
  2. `https://api.open-meteo.com/v1/forecast?latitude=<lat>&longitude=<lng>&current_weather=true&windspeed_unit=ms` — текущая погода
- На карточке отображается:
  - название города,
  - текущая температура (°C),
  - состояние погоды (расшифровка WMO weather code на русский),
  - скорость ветра (м/с),
  - кнопка **«Смотреть прогноз»**, ведущая на страницу прогноза.

### Страница прогноза (`/weather/:city?lat=...&lng=...`)

- Ссылка **«Назад»** на главную страницу.
- Заголовок «Прогноз погоды в городе \<City\>».
- Таблица с прогнозом на **7 дней**:
  - Дата в формате `15/06`
  - Минимальная температура
  - Максимальная температура
  - Погода (расшифровка weather code)
- Данные получаются одним запросом:
  `https://api.open-meteo.com/v1/forecast?latitude=<lat>&longitude=<lng>&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=GMT`

### AutocompleteInput (повышенная сложность)

- Использует `<Form.Control>` и `<ListGroup>` из React Bootstrap.
- При вводе ≥ 2 символов отправляет запрос к
  `https://geocoding-api.open-meteo.com/v1/search?name=<query>`.
- Отображает список вариантов в формате «Город, Страна».
- При клике по варианту:
  - поле заполняется полным названием города,
  - список скрывается,
  - происходит переадресация на `/weather/<city>?lat=...&lng=...`.

## Структура проекта

```
weather-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AutocompleteInput.tsx   # автодополнение с выпадающим списком
│   │   ├── CityCard.tsx            # карточка города с текущей погодой
│   │   ├── Header.tsx              # переиспользуемый заголовок
│   │   └── Loader.tsx              # прелоадер (Spinner)
│   ├── hooks/
│   │   ├── useCurrentWeather.ts    # геокодинг + текущая погода
│   │   └── useForecast.ts          # прогноз на 7 дней
│   ├── pages/
│   │   ├── HomePage.tsx            # главная страница
│   │   └── WeatherPage.tsx         # страница прогноза
│   ├── types/
│   │   └── weather.ts              # TypeScript-интерфейсы API
│   ├── utils/
│   │   ├── formatDate.ts           # форматирование даты (15/06)
│   │   └── weatherCode.ts          # словарь WMO weather code → русский
│   ├── styles/
│   │   └── main.scss               # глобальные стили
│   ├── styles.d.ts                 # декларации для *.css / *.scss
│   ├── react-app-env.d.ts          # типы react-scripts
│   ├── App.tsx                     # роутинг
│   └── index.tsx                   # точка входа
├── package.json
├── tsconfig.json
└── README.md
```

## Реализованные требования

| № | Требование | Статус |
|---|------------|--------|
| 1 | CRA + TypeScript + React Bootstrap + SCSS | ✅ |
| 2 | Главная страница с 6 карточками и 2 API-запросами | ✅ |
| 3 | Страница прогноза с таблицей на 7 дней | ✅ |
| 4 | Переиспользуемые компоненты и хуки | ✅ |
| 5 | Полная типизация (`types/weather.ts`) | ✅ |
| 6 | Нет ошибок в рантайме (AbortController, обработка ошибок) | ✅ |
| 7 | AutocompleteInput с `Form.Control` + `ListGroup` | ✅ |

## Используемые API

- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) — поиск координат по названию города.
- [Open-Meteo Forecast API](https://open-meteo.com/en/docs) — текущая погода и прогноз на 7 дней.
- [WMO Weather interpretation codes](https://open-meteo.com/en/docs) — расшифровка кодов погоды.

## Скрипты npm

| Команда | Описание |
|---------|----------|
| `npm start` | Запуск dev-сервера на `localhost:3000` |
| `npm run build` | Production-сборка в папку `build/` |
| `npm test` | Запуск тестов (Jest + React Testing Library) |
| `npm run eject` | Извлечение конфигурации CRA (необратимо) |

## Автор

*Елисеев Е.Ю. Университет "Синергия"*

## Лицензия

Учебный проект. Свободное использование в образовательных целях.