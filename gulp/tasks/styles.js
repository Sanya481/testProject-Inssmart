/* ========= Модули для работы со стилями */

// Препроцессор sass
import dartSass from "sass";
// Плагин для запуска препроцессора
import gulpSass from "gulp-sass"
// Группировка медиа запросов
import groupCssMediaQueries from "gulp-group-css-media-queries";
// Добавление вендорных префиксов - кроссбраузерность
import autoPrefixer from "gulp-autoprefixer";
// Сжимаем файл css
import cleanCss from "gulp-cleancss";
// Плагин для переименования файла style.scss в style.css и добавления .min
import rename from "gulp-rename";
/* В dev-tools показывает изменения свойств в том файле где они произошли, а не во всем минифицированном и сжатом файле */
import sourcemaps from "gulp-sourcemaps";

// В константу sass делаем вызов из плагина gulpSass с передачей компилятора
const sass = gulpSass(dartSass);

/**
 * Функция для стилей - компиляции, минификации ...
 */
export const styles = () => {
    /* sourcemaps: true - т.к. мы собираем общий файл стилей из множества частей и при возникновении ошибки мы хотим видеть в каком именно файле этот стиль написан. Такая себе Карта исходников - заменим стандартную 'карту' на плагин */
    return app.gulp.src(app.path.src.styles)
      .pipe(sourcemaps.init())
      //... скомпелирует css...
      .pipe(sass().on('error', sass.logError))
      // ...объединит похожие медиа-запросы в один
      .pipe(groupCssMediaQueries())
      // ...добавит префиксы
      .pipe(autoPrefixer({
        /* должен ли Autoprefixer добавлять префиксы IE 10-11 для свойств Grid Layout? включить переводы сетки Autoprefixer, но исключить поддержку авторазмещения. Вы также можете использовать autoprefixer grid: no-autoplace в своем CSS. (псевдоним для устаревшего true значения) */
        grid: 'no-autoplace',
        /* должен ли Autoprefixer использовать Visual Cascade, если CSS не сжат. По умолчанию: true */
        cascade: true,
      }))
      .pipe(cleanCss({
        /* Оптимизация уровня 2 работает на уровне правил или нескольких свойств, например, может удалять повторяющиеся правила, удалять свойства, переопределенные ниже по таблице стилей, или реструктурировать правила, перемещая их. !Обратите внимание, что если оптимизация уровня 2 включена, то, если она явно не отключена, также применяются оптимизации уровня 1. */
        level: 2,
      }))
      .pipe(rename({
        // ...даст название основного подключаемого файла...
        basename: 'style',
        // ...пропишет suffix - после basename(названия файла). prefix - до basename(названия файла).
        suffix: ".min",
        // это расширение файла, включая '.'
        extname: ".css"
      }))
      /* Точка для создания файла style.min.css.map - по умолчанию, эти данные создаются в style.min.css */
      .pipe(sourcemaps.write("."))
      .pipe(app.gulp.dest(app.path.build.styles))
      .pipe(app.plugins.browsersync.stream())
  }
