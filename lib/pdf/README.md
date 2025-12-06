# PDF Course Generation System

Система для генерации PDF курсов через OpenAI API.

## Отслеживание прогресса

### Проверка статуса генерации

Во время генерации можно проверить текущий статус:

```bash
npm run generate-course:status
```

Или напрямую:

```bash
npx tsx scripts/generate-course.ts -- --status
```

### Файлы статуса и логов

- **Статус генерации**: `public/courses/.generation-status.json`
  - Текущий этап генерации
  - Прогресс (0-100%)
  - Сообщения о текущем действии
  - Пути к промежуточным файлам

- **Логи**: `logs/course-generation.log`
  - Детальные логи всех операций
  - Ошибки с полным стеком
  - Временные метки всех действий

- **Промежуточные файлы**: `public/courses/temp/`
  - Сгенерированные JSON курсов (EN и AR)
  - Сохраняются после каждого этапа

## Использование

### 1. Подготовка входного JSON файла

Создайте JSON файл с данными курса (см. пример `avenqor-request-ready-course-trading-foundations.json`)

### 2. Запуск генерации

```bash
npm run generate-course <path-to-json-file>
```

### 3. Мониторинг прогресса

В другом терминале можно отслеживать прогресс:

```bash
npm run generate-course:status
```

Или проверять файл статуса напрямую:

```bash
cat public/courses/.generation-status.json
```

### 4. Результат

После завершения будут созданы:
- ✅ Английский курс (JSON в `temp/`)
- ✅ Арабский курс (JSON в `temp/`)
- ✅ Обложка курса (`public/images/courses/`)
- ✅ Диаграммы (`public/images/courses/diagrams/`)
- ✅ PDF на английском (`public/courses/{courseId}-en.pdf`)
- ✅ PDF на арабском (`public/courses/{courseId}-ar.pdf`)
- ✅ Запись в базе данных

## Этапы генерации

1. **generating_en** (10%) - Генерация английского курса
2. **generating_cover** (30%) - Генерация обложки
3. **generating_diagrams** (40%) - Генерация диаграмм
4. **translating_ar** (50%) - Перевод на арабский
5. **generating_pdf_en** (70%) - Генерация английского PDF
6. **generating_pdf_ar** (85%) - Генерация арабского PDF
7. **completed** (100%) - Завершено

## Устранение проблем

### Процесс завис

Если процесс завис, проверьте:
1. Статус: `npm run generate-course:status`
2. Логи: `logs/course-generation.log`
3. Промежуточные файлы в `public/courses/temp/`

### Ошибка генерации PDF

Убедитесь, что установлен Chrome/Chromium:
- Windows: `C:\Program Files\Google\Chrome\Application\chrome.exe`
- Или установите переменную окружения `CHROME_PATH`

### Ошибка генерации изображений

Проверьте:
- Доступность OpenAI API ключа
- Поддержку модели `gpt-image-1-mini` в вашем аккаунте
- Лимиты API

## Конфигурация

Модели OpenAI настраиваются в `lib/config.ts`:
- `gpt-4o-mini` для текста (курсы и перевод) - до 16K выходных токенов
- `gpt-image-1-mini` для изображений (обложки и диаграммы)

**Важно:** GPT-4o-mini имеет лимит 16K выходных токенов. Если курс превышает этот лимит, он будет обрезан. 
В этом случае рекомендуется использовать `gpt-4o` или оптимизировать промпты.
