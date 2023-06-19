document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Зупинити стандартну поведінку форми
    
    // Отримати значення полів імені користувача та пароля
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Викликати функцію для перевірки даних авторизації
    checkLoginCredentials(username, password);
  });
});

function checkLoginCredentials(username, password) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/profile', true);
  
 
  
  xhr.onload = function() {
	   let profile = JSON.parse(xhr.responseText);
	   let user;
	   let id;
	  // console.log(xhr.responseText);
	   console.log(profile.length);
	   console.log(profile[0].username);
    if (xhr.status < 400) {
      const data = JSON.parse(xhr.responseText);
      //const user = data.profiles.find(user => user.username === username && user.password === password);
	  for(let i = 0; i < profile.length; i+=1){
		  if(username === profile[i].username && password === profile[i].password){
			  id = profile[i].id;
			  user = true;
			  break;
		  }else {user = false}
	  }
      
      if (user) {
        console.log('Авторизація успішна');
		sessionStorage.setItem('id', id);
		window.location.href = './Index.html';
        // Виконати додаткові дії після авторизації
      } else {
        console.log('Невірне ім\'я користувача або пароль');
		console.log(typeof profile[0].username);
		console.log(typeof username);
      }
    } else {
      console.error('Помилка при отриманні даних з бази даних:', xhr.status);
    }
  };
  
  xhr.onerror = function() {
    console.error('Помилка при виконанні запиту до бази даних');
  };
  
  xhr.send();
}

