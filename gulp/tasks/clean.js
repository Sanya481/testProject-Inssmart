// Подкл-ем пакет для удаления файлов
import { deleteAsync } from "del";

/**
 * Функция для очищения папки с результатом
 */
export const clean = () => {
    return deleteAsync(`${app.path.buildFolder}/`)
  }
