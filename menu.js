
const imgURLArr = [
    'image/dish1.jpg',
    'image/dish2.jpg',
    'image/dish3.jpg',
    'image/dish4.jpg',
    'image/dish5.jpg',
    'image/dish6.jpg',
    'image/dish7.jpg',
    'image/dish8.jpg',
    'image/dish9.jpg',
];

const sectionIDs = [
    'tomatoes',
    'salad',
    'chops',
    'okra',
    'potato',
    'beans',
    'corn',
    'chicken',
    'porridge'
];

const promiseArr = [];
const gallery = document.getElementById('gallery');
const spinner = document.getElementById('spinner');

for (let i = 0; i < imgURLArr.length; i++) {
    const url = imgURLArr[i];
    const promise = new Promise(function(resolve, reject) {
        const img = document.createElement('img');
        img.classList.add("picture", "hidden");
        img.src = url;

        img.addEventListener("load", function() {
            resolve(img);
        });

        img.addEventListener("error", function() {
            reject();
        });
    });

    promiseArr.push(promise);
}

Promise.all(promiseArr).then(
    function(images) {
        spinner.style.display = 'none';
        images.forEach((img, index) => {
            img.classList.remove('hidden');
            gallery.appendChild(img);

            img.addEventListener('click', function() {
                const sectionID = sectionIDs[index];
                const section = document.getElementById(sectionID);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    },
    function() {
        spinner.style.display = 'none';
        alert('Помилка завантаження зображень.');
    }
);
// Отримуємо всі кнопки
const buttons = document.querySelectorAll('.order-btn');

// Визначаємо різні ефекти для кожної кнопки
const effects = [
    {
        hover: {
            scale: 1.2,
            backgroundColor: '#ff6347',
        },
        click: {
            rotate: '1turn',
            backgroundColor: '#ffa500',
        }
    },
    {
        hover: {
            translateX: 10,
            backgroundColor: '#4682b4',
        },
        click: {
            translateY: 10,
            scale: 1.3,
            backgroundColor: '#4169e1',
        }
    },
    {
        hover: {
            scale: 1.5,
            rotate: '0.5turn',
        },
        click: {
            scale: 1,
            rotate: '1turn',
            backgroundColor: '#32cd32',
        }
    },
    {
        hover: {
            scale: 1.3,
            boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.3)',
        },
        click: {
            scale: [1.5, 1],
            backgroundColor: '#d2691e',
        }
    }
];

// Додаємо ефекти для кожної кнопки
buttons.forEach((button, index) => {
    const effect = effects[index % effects.length]; // Повторюємо ефекти, якщо кнопок більше ніж налаштувань

    // Анімація при наведенні
    button.addEventListener('mouseenter', () => {
        anime({
            targets: button,
            ...effect.hover,
            duration: 500,
            easing: 'easeInOutQuad',
        });
    });

    // Анімація при знятті курсору
    button.addEventListener('mouseleave', () => {
        anime({
            targets: button,
            scale: 1,
            translateX: 0,
            translateY: 0,
            rotate: 0,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#ff4500',
            duration: 500,
            easing: 'easeInOutQuad',
        });
    });

    // Анімація при кліку
    button.addEventListener('click', () => {
        anime.timeline()
            .add({
                targets: button,
                ...effect.click,
                duration: 800,
                easing: 'easeOutQuad',
            });
    });
});

//лаб7

const thumbs = document.getElementById('thumbs');
const largeImg = document.getElementById('largeImg');

// Делегування подій для обробки кліків
thumbs.onclick = function(event) {
    const thumbnail = event.target.closest('a'); // Знаходимо найближчий елемент <a>
    if (!thumbnail) return; // Якщо клік був не на мініатюрі, нічого не робимо
    showThumbnail(thumbnail.href, thumbnail.title); // Оновлюємо велике зображення
    event.preventDefault(); // Відміняємо стандартну поведінку переходу
};

// Функція оновлення великого зображення
function showThumbnail(href, title) {
    largeImg.src = href; // Змінюємо джерело зображення
    largeImg.alt = title; // Змінюємо альтернативний текст
}
//лаб8
    const dishInputsContainer = document.getElementById('dishInputs');
    const resultElement = document.getElementById('result');
    const addDishBtn = document.getElementById('add-dish-btn');
    const calculateBtn = document.getElementById('calculate-btn');

    const menuItems = [
        { name: "Смажені зелені помідори", price: 50 },
        { name: "Салат зі зеленими помідорами", price: 30 },
        { name: "Відбивні зі свинини", price: 70 },
        { name: "Смажена бамія", price: 40 },
        { name: "Смажений батат", price: 55 },
        { name: "Салат з лімською квасолею", price: 35 },
        { name: "Кукурудза з вершками", price: 25 },
        { name: "Курячі відбивні", price: 60 },
        { name: "Кукурудзяна каша", price: 50 }
    ];

    function addDishToCalculator(name = '', quantity = 1) {       
        const dishRow = document.createElement('div');
        dishRow.classList.add('dish-row');

        const nameSelect = document.createElement('select');
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Оберіть страву';
        defaultOption.value = '';
        nameSelect.appendChild(defaultOption);

        menuItems.forEach(item => {
            const option = document.createElement('option');
            option.value = item.name;
            option.textContent = `${item.name} (${item.price} грн)`;
            nameSelect.appendChild(option);
        });

        nameSelect.value = name;

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = quantity;
        quantityInput.placeholder = 'Кількість';

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Видалити';
        removeBtn.addEventListener('click', () => dishRow.remove());

        dishRow.appendChild(nameSelect);
        dishRow.appendChild(quantityInput);
        dishRow.appendChild(removeBtn);

        dishInputsContainer.appendChild(dishRow);
    }

    document.querySelectorAll('.order-btn').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            addDishToCalculator(name);
        });
    });

    addDishBtn.addEventListener('click', () => {
        addDishToCalculator();
    });

    function applyDiscount(total) {
        if (total >= 500) {
            return total * 0.9;
        }
        return total;
    }
    
    function checkComboDiscount(selectedDishes) {
        const combos = [
            { dishes: ["Відбивні зі свинини", "Курячі відбивні"], discount: -40 },
            { dishes: ["Смажені зелені помідори", "Відбивні зі свинини"], discount: -30 },
            { dishes: ["Курячі відбивні", "Смажений батат"], discount: -20 },
            { dishes: ["Кукурудзяна каша", "Кукурудза з вершками"], discount: -15 }
        ];
    
        for (const combo of combos) {
            if (combo.dishes.every(dish => selectedDishes.includes(dish))) {
                return combo.discount;
            }
        }
        return 0;
    }
    
    calculateBtn.addEventListener('click', () => {
        let total = 0;
        const dishRows = document.querySelectorAll('.dish-row');
        const selectedDishes = [];
    
        dishRows.forEach(row => {
            const name = row.querySelector('select').value;
            const quantity = parseInt(row.querySelector('input[type="number"]').value);
            const item = menuItems.find(item => item.name === name);
    
            if (item && !isNaN(quantity) && quantity > 0) {
                total += item.price * quantity;
                selectedDishes.push(name);
            }
        });
    
        const regularTotal = total; // Звичайна сума
        let comboDiscount = 0;
    
        if (regularTotal < 500) {
            comboDiscount = checkComboDiscount(selectedDishes);
            total += comboDiscount;
        }
    
        resultElement.innerHTML = `<p>Загальна сума: ${regularTotal.toFixed(2)} грн</p>`;
    
        if (regularTotal >= 500) {
            const discountedTotal = applyDiscount(regularTotal);
            resultElement.innerHTML += `<p>Загальна сума (зі знижкою 10%): ${discountedTotal.toFixed(2)} грн</p>`;
        } else if (comboDiscount < 0) {
            resultElement.innerHTML += `<p>Загальна сума з урахуванням знижки на комбінацію (${Math.abs(comboDiscount)} грн): ${total.toFixed(2)} грн</p>`;
        } else {
            const remaining = (500 - regularTotal).toFixed(2);
            resultElement.innerHTML += `<p>Для отримання знижки 10%, замовте ще страв на ${remaining} грн.</p>`;
        }
    });
    
