   document.addEventListener('DOMContentLoaded', () => {
      const form = document.getElementById('registration-form');

      form.addEventListener('submit', (event) => {
        event.preventDefault(); // Зупинити стандартну поведінку форми

        // Отримати значення полів форми
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
		const password_repeat = document.getElementById('password-repeat').value;
		
		if (password != password_repeat)
		{
			alert("Паролі не співпадають");
		}else
		{
			//створення унікального id
		let uuid = self.crypto.randomUUID();

           // Створити об'єкт з даними реєстрації
		const registrationData = {
			id : uuid,
			username: username,
			password: password
			};

		// Створити новий XMLHttpRequest об'єкт
		const xhr = new XMLHttpRequest();

		// Встановити метод та URL запиту
		xhr.open('POST', 'http://localhost:3000/profile', true);

		// Встановити заголовки запиту
		xhr.setRequestHeader('Content-Type', 'application/json');

		// Встановити обробник події завершення запиту
		xhr.onload = function () {
		if (xhr.status === 201) {
			console.log('Успішно зареєстровано!');
			console.log(JSON.stringify(registrationData));
			window.location.href = './login.html';
			// Тут можна виконати необхідні дії після успішної реєстрації
			} else {
				console.log('Сталася помилка під час реєстрації.');
				console.log(xhr.status);
				// Тут можна виконати дії в разі помилки
			}
		};

		// Відправити дані реєстрації на сервер
		xhr.send(JSON.stringify(registrationData));

        // Очистити форму після відправки
        form.reset();		
		}
		

      });
    });