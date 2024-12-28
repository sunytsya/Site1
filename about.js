document.getElementById("feedback-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const errorContainer = document.getElementById("error-container");
    errorContainer.innerHTML = "";

    const errors = [];

    // Валідація імені
    const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄє\'-]{3,}$/;
    if (!name) {
        errors.push("Поле ім'я обов'язкове.");
    } else if (!nameRegex.test(name)) {
        errors.push("Ім'я повинно містити тільки літери, апострофи або дефіси, і бути не менше 3 символів.");
    }

    // Валідація прізвища
    if (!surname) {
        errors.push("Поле прізвище обов'язкове.");
    } else if (!nameRegex.test(surname)) {
        errors.push("Прізвище повинно містити тільки літери, апострофи або дефіси, і бути не менше 3 символів.");
    }

    // Валідація email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!email) {
        errors.push("Поле email обов'язкове.");
    } else if (!emailRegex.test(email)) {
        errors.push("Email повинен бути у форматі example@mail.com або name.surname@domain.ua і містити тільки латинські літери.");
    }



    // Валідація телефону
    const phoneRegex = /^(\+380|0)(39|50|63|66|67|68|73|91|92|93|94|95|96|97|98|99)\d{7}$/;

    if (!phone) {
        errors.push("Поле телефон обов'язкове.");
    } else if (!phoneRegex.test(phone)) {
        errors.push("Телефон повинен бути у форматі +380XXXXXXXXX або 0XXXXXXXXX і належати до українського оператора.");
    }


    // Показ помилок або успішне повідомлення
    if (errors.length > 0) {
        const errorList = document.createElement("ul");
        errorList.className = "error-list";
        errors.forEach(error => {
            const listItem = document.createElement("li");
            listItem.textContent = error;
            errorList.appendChild(listItem);
        });
        errorContainer.appendChild(errorList);
    } else {
        alert("Форма успішно відправлена!");
        document.getElementById("feedback-form").reset();
    }
});