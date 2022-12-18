/*  P.S. Не очень универсальный способ переключения табов. Через значение data атрибута */

// document.addEventListener('DOMContentLoaded', () => {
//     const body = document.body;
//     const tabBtns = document.querySelectorAll('[data-tab-btn]');
//     const tabContents = document.querySelectorAll('[data-tab-content]');

//     body.addEventListener('click', (evt) => {
//         if (evt.target.matches('[data-tab-btn]')) {
//             const tabBtnData = evt.target.dataset.tabBtn;
//             switchTabContent(tabBtnData);
//         }
//     })

//     /**
//      * @description Изменение контента в зависимости от нажатой кнопки
//      * @param {string} tabBtnData - значение дата атрибута у кнопки по которой кликнул пользователь
//      */
//     const switchTabContent = (tabBtnData) => {
//         tabBtns.forEach(btn => {btn.classList.remove('active')});
//         document.querySelector(`[data-tab-btn="${tabBtnData}"]`).classList.add('active');

//         tabContents.forEach(content => {content.classList.remove('active')});
//         document.querySelector(`[data-tab-content="${tabBtnData}"]`).classList.add('active');
//     }

// })

// const body = document.body;
// const tabBtns = Array.from(document.querySelectorAll('[data-tab-btn]'));
// const tabContents = Array.from(document.querySelectorAll('[data-tab-content]'));

// document.addEventListener('DOMContentLoaded', () => {
//   // Инициализировали активные табы
//   tabBtns[0].classList.add('active');
//   tabContents[0].classList.add('active');

//   // Повесили обработчик клика на тег body
//   body.addEventListener('click', (evt) => {
//     // и если клик был по кнопке с нужным атрибутом
//     if (evt.target.matches('[data-tab-btn]')) {
//       // берем эту кнопку
//       const currentTab = evt.target;
//       // индекс кнопки (индекс кнопки, совпадает с индексом контента - на индексах эл-тов построено переключение между табами)
//       const indexTab = tabBtns.indexOf(currentTab);
//       // если у кнопки по ко-ой кликнули не имеет класс active
//       if (!currentTab.classList.contains('active')) {
//         // проходимся по всем кнопкам и убираем класс active
//         tabBtns.forEach((tab) => {
//           tab.classList.remove('active');
//         })
//         // а нужной кнопке вешаем класс active
//         currentTab.classList.add('active');
//         // то же самое с контентом - убираем класс active
//         tabContents.forEach((tab) => {
//           tab.classList.remove('active');
//         })
//         // и контенту, индекс которого совпадает с индексом кнопки - вешаем класс active
//         tabContents[indexTab].classList.add('active');
//         tabContents[indexTab].style.maxHeight = tabContents[indexTab].offsetHeight + 'px';
//         // .style.maxHeight = offsetHeight + 'px';
//       }

//     }
//   })
// })

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
const elements = template.cloneNode(true);

/**
 * @description Создание характеристики введенное пользователем и добавление в список характеристик
 * @param {HTMLElement} optionList - место для вставки сообщения
 * @param {HTMLElement} option - поле ввода характеристики
 */
const createElement = (optionList, option) => {
  const characteristic = document.createElement('li');
  characteristic.dataset.option = '';
  characteristic.textContent = option.value;


  optionList.append(characteristic);
  // Очищаем поле ввода после добавления хар-ки
  option.value = '';

}



if (characteristicForms) {

  characteristicForms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const currentForm = evt.target;
      const formWrapper = currentForm.querySelector('[data-form-wrapper]');
      const goodCharacteristic = currentForm.querySelector('[data-good-characteristic]');
      const formGroup = formWrapper.querySelector('[data-form-group]');

      const characteristicBlock = currentForm.closest('[data-characteristic-block]');

      const characteristicList = characteristicBlock.querySelector('[data-characteristic-list]');


      // Если поле для ввода хар-ки не пустое
      if (goodCharacteristic.value.trim() != "") {

        // checkRepeatOption(goodCharacteristic.value, characteristicBlock);

        // Код внизу - подробное описание функции
        createElement(characteristicList, goodCharacteristic);
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
      }
    })
  })

  // Удаление сообщения при начале ввода текста
  formInputFields.forEach((field) => {
    field.addEventListener('input', (evt) => {
      const currentForm = evt.target.closest('[data-characteristic-form]');
      const errorMessage = currentForm.querySelector('[data-error-message]');

      // Если поле не пустое и есть сообщение - удалим сообщение
      if (evt.target.value != "" && errorMessage) {
        errorMessage.remove();
      }
    })
  })

}


const tabBtns = Array.from(document.querySelectorAll('[data-tab-btn]'));
const tabContents = Array.from(document.querySelectorAll('[data-tab-content]'));
const tabItems = Array.from(document.querySelectorAll('[data-tab-item]'));
const bodyWrapper = document.querySelector('[data-body-wrapper]')

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








