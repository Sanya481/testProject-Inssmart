/* ========= Модули для работы с изображениями */

// Сжимает/оптимизирует изображения
import imagemin from "gulp-imagemin";
// Плагин для передачи только тех исходных файлов, которые новее соответствующих файлов назначения.
import newer from "gulp-newer";
// Создает изображения в webp формате
import webp from "gulp-webp";

/**
 * Функция для работы с изображениями в формате svg
 */
export const svg = () => {
  // Т.к sprite формируется вручную - исключаем его из скрипта и в последующем просто скопируем содержимое
  return app.gulp.src([app.path.src.svg, `!${app.path.srcFolder}/img/sprite.svg`])
    /* ...чтобы каждый раз не сжимать одни и те же изображения - т.к. мы не удаляем исходную папку dist, просто проверим её на наличие новых файлов и если они есть то ТОЛЬКО НОВЫЕ обработаются, а старые так и останутся без изменений. Если нет фоток одинаковых - делаем все, как обычно по ходу действия функции... Если есть новые - обрабатываем только их  */
    .pipe(newer(app.path.build.img))
    // Сжимаем картинки
    .pipe(imagemin({
      // Включение этого параметра будет регистрировать информацию о каждом изображении (информация о сжатии), переданном в gulp-imagemin.
      verbose: true
    }))
    .pipe(app.gulp.dest(app.path.build.img))
    // ...и запустит локальный сервер (браузер)
    .pipe(app.plugins.browsersync.stream())
}

/**
 * Просто копирование файла sprite.svg
 */
export const copySpriteSvg = () => {
  return app.gulp.src(app.path.src.spriteSvg)
    .pipe(app.gulp.dest(app.path.build.img));
};

/**
 * Функция для работы с изображениями отличными от формата svg
 */
export const images = () => {
  return app.gulp.src(app.path.src.images)
    .pipe(newer(app.path.build.img))
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 3,
      quality: 75,
      verbose: true
    }))
    .pipe(app.gulp.dest(app.path.build.img))
    .pipe(app.plugins.browsersync.stream())
}

/**
 * Функция для создания изображений в формате webp
 */
export const createWebp = () => {
    return app.gulp.src(`${app.path.srcFolder}/img/**/*.{jpeg,jpg,png}`)
      .pipe(webp())
      .pipe(app.gulp.dest(app.path.build.img))
  }
