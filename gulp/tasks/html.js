/* ========= Модули для работы с html */

// Минифицируем код
import htmlmin from "gulp-htmlmin";

/**
 * Функция обработки html кода...
 */
export const html = () => {
    // ...заберет наш код...
    return app.gulp.src(app.path.src.html)
      .pipe(htmlmin({
        // Удалить HTML-комментарии
        removeComments: true,
        // ...уберет пробелы между кодом (код получится в одну строку)...
        collapseWhitespace: true
      }))
      .pipe(app.gulp.dest(app.path.build.html))
      // После того, как скопировали созданные обработанные html файлы - запускаем сервер и обновления при каждом изменении
      .pipe(app.plugins.browsersync.stream())
  }
