/**
 * Функция подключения локального сервера - открытие браузера
 */
export const server = () => {
    // Определяем логику работы Browsersync
    // Инициализация Browsersync
    app.plugins.browsersync.init({
      server: {
        // Базовая папка откуда нам нужно запустить файлы и отслеживаем мы html файл
        baseDir: `${app.path.buildFolder}/`
      },
      // Убираем сообщения плагина notify об ошибках в браузере - если нужны, то изменить на true
      notify: false,
      // Параметр online отвечает за режим работы. Укажите online: false, если хотите работать без подключения к интернету.
      online: true
    })
  }
