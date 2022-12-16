/* Подсказки */
/* .pipe() - с использованием оператора pipe() выстраивается последовательность выполнения операций; */

// Поясненеия к маскам
// ** - проверяем файлы в любых вложенных папках внутри папки
// *.* - файлы с любым названием и с любым расширением


// Основной модуль для работы
import gulp from "gulp";

// Импорт путей
import { path } from "./gulp/config/path.js";

// Импорт часто используемых модулей
import { plugins } from "./gulp/config/plugins.js";

// Импорт задач
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { html } from "./gulp/tasks/html.js";
import { styles } from "./gulp/tasks/styles.js";
import { script } from "./gulp/tasks/script.js";
import { clean } from "./gulp/tasks/clean.js";
import { server } from "./gulp/tasks/server.js";
import { createWebp, images, copySpriteSvg, svg } from "./gulp/tasks/images.js";


// Передаем значения в глобальную переменную для того, чтобы они были доступны в разных папках
global.app = {
  gulp: gulp,
  path: path,
  plugins: plugins,
}


// gulp.watch(путь к файлам за которыми нужно следить и через запятую - действие которое нужно выполнить при изменении файлов или папок)
/**
 * Наблюдатель за изменениями в файлах
 */
const watcher = () => {
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.styles, styles);
  gulp.watch(path.watch.svg, svg);
  gulp.watch(path.watch.spriteSvg, copySpriteSvg);
  gulp.watch(path.watch.images, gulp.series(images, createWebp));
  gulp.watch(path.watch.js, script);
}


// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Из-за разросшихся задач, выносим выполнение задач в отдельную константу...
// ...и построим сценарии выполнения задач

const build = gulp.series(clean, html, fonts, styles, script, svg, copySpriteSvg, images, createWebp, gulp.parallel(watcher, server));

/* Для того, чтобы получить готовый к запуску таск, функцию или комбинацию функций необходимо экспортировать. */
// Экспортируем функцию html() как таск html. Значение после знака = это имеющаяся функция

export { build };

// Скрипты для работы с шрифтами вынесены в отдельные команды

// Если в папке есть шрифты в формате .otf - используйте команду - gulp otfToTtf для перевода в формат ttf
export { otfToTtf };
// Если в папке есть шрифты в формате .ttf - используйте команду - gulp ttfToWoff для перевода в формат woff
export { ttfToWoff };
// Скрипт для подключения шрифтов с помощью @font-face и создания файла fonts.scss - gulp fontsStyle
export { fontsStyle };


/* Дефолтный таск позволяет запускать проект одной командой gulp в терминале. */


// export { spriteCopy }
export { fonts }
