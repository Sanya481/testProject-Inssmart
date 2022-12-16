// P.S. Не очень универсальный способ

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

const body = document.body;
const tabBtns = Array.from(document.querySelectorAll('[data-tab-btn]'));
const tabContents = Array.from(document.querySelectorAll('[data-tab-content]'));

document.addEventListener('DOMContentLoaded', () => {
    // Инициализировали активные табы
    tabBtns[0].classList.add('active');
    tabContents[0].classList.add('active');

    // Повесили обработчик клика на тег body
    body.addEventListener('click', (evt) => {
        // и если клик был по кнопке с нужным атрибутом
        if (evt.target.matches('[data-tab-btn]')) {
            // берем эту кнопку
            const currentTab = evt.target;
            // индекс кнопки (индекс кнопки, совпадает с индексом контента - на индексах эл-тов построено переключение между табами)
            const indexTab = tabBtns.indexOf(currentTab);
            // если у кнопки по ко-ой кликнули не имеет класс active
            if (!currentTab.classList.contains('active')) {
                // проходимся по всем кнопкам и убираем класс active
                tabBtns.forEach((tab) => {
                    tab.classList.remove('active');
                })
                // а нужной кнопке вешаем класс active
                currentTab.classList.add('active');
                // то же самое с контентом - убираем класс active
                tabContents.forEach((tab) => {
                    tab.classList.remove('active');
                })
                // и контенту, индекс которого совпадает с индексом кнопки - вешаем класс active
                tabContents[indexTab].classList.add('active');
            }

        }
    })
})

// Добавление характеристик

const characteristicForms = document.querySelectorAll('[data-characteristic-form]');

const formInputFields = document.querySelectorAll('[data-good-characteristic]');

const templateFragment = document.querySelector('#error-message').content;
const template = templateFragment.querySelector('[data-error-message]');
const elements = template.cloneNode(true);

// const goodCharacteristic = document.querySelector('[data-good-characteristic]');

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
}

// !!! метод trim() позволяет удалить пробелы с обоих концов строки
/**
 * Проверка на пустую строку
 * @param {string} string - вводимые пользователем данные
 * @param {HTMLElement} btn - кнопка, которая должна появится при вводе данных
 */
const isEmptyString = (string, btn) => {
    if (string.trim() != "") {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
}

// const checkRepeatOption = (inputValue, block) => {
//     // const characteristicBlock = block.querySelector('[data-characteristic-block]');

//     const characteristicList = block.querySelector('[data-characteristic-list]');
//     const options = characteristicList.querySelectorAll('[data-option]');

//     const formWrapper = block.querySelector('[data-form-wrapper]');

//     options.forEach((option) => {
//         if (inputValue === option.textContent) {
//             // elements.querySelector('[data-error-text]').textContent = 'Повтор';
//             formWrapper.append(elements);
//             console.log('ok')
//         }
//     })
// }

if (characteristicForms) {

    characteristicForms.forEach((form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const currentForm = evt.target;
            const formWrapper = currentForm.querySelector('[data-form-wrapper]');
            const goodCharacteristic = currentForm.querySelector('[data-good-characteristic]');
            const formGroup = formWrapper.querySelector('[data-form-group]');

            const characteristicBlock = currentForm.closest('[data-characteristic-block]');
            // const options = characteristicBlock.querySelectorAll('[data-option]');

            const characteristicList = characteristicBlock.querySelector('[data-characteristic-list]');

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
                // console.log(currentForm)
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




