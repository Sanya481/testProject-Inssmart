Шаблон предназначен для начала работы над проектом с использованием препроцессора Sass и сборщика проектов Gulp.

# Все исходные файлы размещаются в папке src, результат будет сохраняться в папку build:

```bash
.
├─ /build                       # Каталог сборки проекта (cоздаётся автоматически)
│   ├─ /css                     # Папка со стилями
|   ├─ /fonts                   # Папка с шрифтами. При использовании скрипта gulp ttfToWoff, шрифты автоматически переносятся в эту папку в форматах woff, woff2
│   ├─ /img                     # Папка с изображениями
│   ├─ /js                      # Папка с скриптами
│   └─ index.html               # Файл с html кодом
├─ /gulp
|    ├─ /config
|    |   ├─ path.js
|    |   └─ plugins.js
|    └─ /tasks
|        ├─ clean.js
|        ├─ fonts.js
|        ├─ html.js
|        ├─ images.js
|        ├─ script.js
|        ├─ server.js
|        └─ styles.js
├─ /src                         # Каталог для размещения исходных файлов проекта
│   ├─ /fonts
│   ├─ /img
│   ├─ /js
│   │   └─ script.js
│   └─ /styles
|       ├─ /blocks
│       ├─ /global
|       |   ├─ variables.scss   # Файл для переменных
|       |   └─ fonts.scss       # Файл куда будут компилироваться шрифты при использовании скрипта - gulp fontsStyle
|       └─ style.scss
├─ gulpfile.js
├─ .editorconfig                # файл конфигурации настроек редактора
├─ .gitignore                   # файл исключений Git
├─ README.md                    # документация проекта
├─ package-lock.json            # lock-файл npm
└─ package.json


