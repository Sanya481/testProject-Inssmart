// Выбор препроцессора в проекте - sass или less
const preprocessor = '{scss, sass}';

// Путь к папке с исходниками
const srcFolder = 'src';
// Путь к папке с результатом
const buildFolder = 'build';

// Создаем общий обьект path в котором будет хранится вся информация о пути к тому или иному файлу или папке.
export const path = {
  // Папка с результатом (куда мы хотим помещать наши файлы)
  build: {
    html: `${buildFolder}/`,
    styles: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    // Т.к в зависимости от расширения шрифта, мы будем вызывать определенный скрипт - будем расписывать пути к шрифтам точно
    fonts: `${buildFolder}/fonts/`,
    img: `${buildFolder}/img/`,
  },
  // Исходная папка
  src: {
    html: `${srcFolder}/*.html`,
    styles: `${srcFolder}/styles/style.scss`,
    js: `${srcFolder}/js/script.js`,
    images: `${srcFolder}/img/**/*.{jpeg,jpg,png,gif,ico,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    spriteSvg: `${srcFolder}/img/**/sprite.svg`
  },
  // Слежка gulp-ом за изменениями и выполнение определенных действий
  watch: {
    html: `${srcFolder}/*.html`,
    styles: `${srcFolder}/styles/**/*.${preprocessor}`,
    js: `${srcFolder}/js/**/*.js`,
    images: `${srcFolder}/img/**/*.{jpeg,jpg,png,gif,ico,webp}`,
    svg: [`${srcFolder}/img/**/*.svg`, `!${srcFolder}/img/**/sprite.svg`],
    spriteSvg: `${srcFolder}/img/**/sprite.svg`
  },
  buildFolder: buildFolder,
  srcFolder: srcFolder
}
