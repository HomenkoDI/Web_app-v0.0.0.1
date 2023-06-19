document.addEventListener('DOMContentLoaded', () => {
	console.log(sessionStorage['id']);
  // Кнопки реєстрації та авторизації
  const registerButton = document.getElementById('register-button');
  const loginButton = document.getElementById('login-button');
  const greatings = document.getElementById('greatings');
  const exitButton = document.getElementById('exit-button');
  const nonAutorised = document.getElementById('non-autorised');
  
  registerButton.addEventListener('click', () => {
    // Обробник натискання на кнопку реєстрації
    window.location.href = './registration.html';
  });
  
  loginButton.addEventListener('click', () => {
    // Обробник натискання на кнопку авторизації
    window.location.href = './login.html';
  });
  
  exitButton.addEventListener('click', () => {
    // Обробник натискання на кнопку виходу
    sessionStorage.removeItem('id');
	console.log(sessionStorage['id']);
	location.reload();
  });
  
  // Кнопка "Головна"
  const homeButton = document.getElementById('home-button');
  
  homeButton.addEventListener('click', () => {
    // Обробник натискання на кнопку "Головна"
    window.location.href = './Index.html';
	
  });
      // Запит на отримання даних
	const xhr = new XMLHttpRequest();

	xhr.open('GET', 'http://localhost:3000/profile')
	xhr.responseType = 'json';
	xhr.onload = () => {
		let db = xhr.response;
		console.log(db[0].id);
		console.log(db.length);
		console.log(xhr.response);
		for(var i = 0; i < db.length; i+=1){
			//console.log(db[i].id);
			if(db[i].id === sessionStorage['id']){
				console.log("Not Error");
				username = db[i].username;
				
				const xhr = new XMLHttpRequest();
				xhr.open('GET', 'http://localhost:3000/posts');
	
				// Парсимо відповідь з сервера у форматі об'єктів джаваскрипта
				xhr.responseType = 'json';
				//console.log(xhr.response);
	
				// При отриманні відповіді записуємо дані у порожні заготовки на сторінці сайту
				xhr.onload = () => {
					console.log(xhr.response);
					let db = xhr.response;

					let catalog = document.getElementsByClassName('catalog');
					let links = document.getElementsByClassName('links');
					let titles = document.getElementsByClassName('titles');
					console.log(catalog.length);
					console.log(titles);
		
					for(var i = 0; i < catalog.length; i+=1){
						titles[i].textContent = db[i].title;
						catalog[i].textContent = db[i].text;
						links[i].textContent = db[i].link;
						links[i].href = db[i].link;
						console.log(catalog[i]);
						console.log(db[i].text);
					}
				registerButton.style.display = 'none';
				loginButton.style.display = 'none';
				exitButton.style.display = 'inline-block';
				greatings.textContent = ('Вітаємо, ' + username);
				}
				xhr.send();
				break;				
			}else if(sessionStorage['id'] == null){
				nonAutorised.style.display = 'inline';
				nonAutorised.textContent = 'Авторизуйтеся для перегляду вмісту сайта!'
				nonAutorised.textAlign = 'center';
				}
		}
	} 
	xhr.send();

});
