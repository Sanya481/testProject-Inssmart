// Добавление характеристик

/**
 * Форма для навешивания обработчика
 */
const characteristicForms = document.querySelectorAll('[data-characteristic-form]');

/**
 * Поле для ввода характеристики
 */
const formInputFields = document.querySelectorAll('[data-good-characteristic]');

// Получение шаблона для заполнения
const templateFragment = document.querySelector('#error-message').content;
const template = templateFragment.querySelector('[data-error-message]');


/**
 * @description Создание характеристики введенное пользователем и добавление в список характеристик
 * @param {HTMLElement} optionList - место для вставки сообщения
 * @param {HTMLElement} option - поле ввода характеристики
 * @param {HTMLElement} form - форма ввода хар-ки
 */
const createElement = (optionList, option, form) => {
  const characteristic = document.createElement('li');
  characteristic.dataset.option = '';
  characteristic.textContent = option.value;

  // Кнопка добавления хар-ки
  const submitBtn = form.querySelector('[data-submit-btn]');
  // Место куда добавлять сообщение об ошибке
  const formGroup = form.querySelector('[data-form-group]');

  // Находим все хар-ки
  const characteristics = optionList.querySelectorAll('[data-option]');
  // Создаем пустой массив для значений (характеристик в ввиде строки)
  const characteristicsString = [];
  // Извлекаем из списка хар-ик только строки и добавляем в массив
  characteristics.forEach((item) => {
    characteristicsString.push(item.textContent);
  })

  // Проверка на похожие хар-ки
  if (characteristicsString.includes(option.value)) {
    // Скопировали из шаблона разметку
    const elements = template.cloneNode(true);
    // Поменяли текст
    elements.querySelector('[data-error-text]')
      .textContent = 'Похоже эта характеристика уже существует!';

    formGroup.after(elements);
    submitBtn.disabled = true;

    // Проверка, если вводится хар-ка на английском
  } else if (/[a-zA-Z]/.test(option.value)) {
    // Скопировали из шаблона разметку
    const elements = template.cloneNode(true);
    // Поменяли текст
    elements.querySelector('[data-error-text]')
      .textContent = 'Можно по-русски пжлст:) Ай донт спик инглиш!';

    formGroup.after(elements);
    submitBtn.disabled = true;
  } else {
    optionList.append(characteristic);
    // Очищаем поле ввода после добавления хар-ки
    option.value = '';
  }
}

if (characteristicForms) {
  characteristicForms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // Форма
      const currentForm = evt.target;
      // Обертка формы
      const formWrapper = currentForm.querySelector('[data-form-wrapper]');
      // Поле для ввода хар-ки
      const goodCharacteristic = currentForm.querySelector('[data-good-characteristic]');
      // Блок с полем ввода
      const formGroup = formWrapper.querySelector('[data-form-group]');
      // Общий блок с хар-ми
      const characteristicBlock = currentForm.closest('[data-characteristic-block]');
      // Список с хар-ми
      const characteristicList = characteristicBlock.querySelector('[data-characteristic-list]');
      // Кнопка добавления хар-ки
      const submitBtn = currentForm.querySelector('[data-submit-btn]');

      const elements = template.cloneNode(true);

      // Если поле для ввода хар-ки не пустое
      if (goodCharacteristic.value.trim() != "") {

        // Код внизу - подробное описание функции
        createElement(characteristicList, goodCharacteristic, currentForm);
        // const characteristic = document.createElement('li');
        // characteristic.dataset.option = '';
        // characteristic.textContent = goodCharacteristic.value;
        // characteristicList.append(characteristic);

        // Если есть сообщение об ошибке ввода, когда пользователь ввел характеристику - удаляем сообщение
        if (elements) {
          elements.remove();
        }
        // Если пол-ль пытается отправить пустую строку - выводим сообщение
      } else {
        formGroup.after(elements);
        submitBtn.disabled = true;
      }
    })
  })

  // Удаление сообщения при начале ввода текста
  formInputFields.forEach((field) => {
    field.addEventListener('input', (evt) => {
      const currentForm = evt.target.closest('[data-characteristic-form]');
      const errorMessage = currentForm.querySelector('[data-error-message]');
      // Кнопка добавления хар-ки
      const submitBtn = currentForm.querySelector('[data-submit-btn]');

      // Если поле не пустое и есть сообщение - удалим сообщение
      if (evt.target.value != "" && errorMessage) {
        errorMessage.remove();
        submitBtn.disabled = false;
      }

      if (evt.target.value === "" && errorMessage) {
        errorMessage.remove();
        submitBtn.disabled = false;
      }
    })
  })
}

// Массив кнопок - табов
const tabBtns = Array.from(document.querySelectorAll('[data-tab-btn]'));
// Массив контента
const tabContents = Array.from(document.querySelectorAll('[data-tab-content]'));
// Обертка табов
const tabItems = Array.from(document.querySelectorAll('[data-tab-item]'));
// Общая обертка сайта
const bodyWrapper = document.querySelector('[data-body-wrapper]')
// Общий блок с табами
const tabs = document.querySelector('[data-tabs-section]');

// Инициализация активных эл-ов
document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(max-width: 968px)').matches) {
    tabItems[0].classList.add('is-open');
    tabContents[0].style.maxHeight = tabContents[0].scrollHeight + 'px';
  }

  if (window.matchMedia('(min-width: 969px)').matches) {
    tabItems[0].classList.add('is-active');
    bodyWrapper.style.paddingBottom = tabContents[0].scrollHeight + 'px';
  }
})

/* Переключение табов происходит при добавлении класса к эл-ту tabs__item и у какого эл-та есть класс тот таб и открываем - такая реализация из-за разметки */
if (tabs) {
  tabs.addEventListener('click', (evt) => {
    if (evt.target.matches('[data-tab-btn]')) {
      const tabItem = evt.target.closest('[data-tab-item]');
      const tabContent = tabItem.querySelector('[data-tab-content]');

      // Планшетная, мобильная версия
      if (window.matchMedia('(max-width: 968px)').matches) {
        tabItem.classList.toggle('is-open');

        if (tabItem.classList.contains('is-open')) {
          tabContent.style.maxHeight = tabContent.scrollHeight + 'px';
        } else {
          tabContent.style.maxHeight = 0;
        }
      }

      // Десктопная версия
      if (window.matchMedia('(min-width: 969px)').matches) {
        tabItems.forEach((item) => {
          item.classList.remove('is-active');
          tabItem.classList.add('is-active');
          // Добавляем паддинг общей обертке табов page-body__wrapper
          bodyWrapper.style.paddingBottom = tabContent.scrollHeight + 'px';
        })
      }
    }
  })
}
