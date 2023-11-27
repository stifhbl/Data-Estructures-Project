const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () =>{
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () =>{
    container.classList.remove("sign-up-mode");
});

document.addEventListener('DOMContentLoaded', () => {
  const dbRequest = indexedDB.open('UsersDatabase', 1);

  dbRequest.onupgradeneeded = event => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains('users')) {
      const objectStore = db.createObjectStore('users', { keyPath: 'username' });
      objectStore.createIndex('email', 'email', { unique: true });
    }
  };

  dbRequest.onerror = event => {
    console.error('Error al abrir la base de datos', event);
  };

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function registerUser(email, username, password) {
    if (!validateEmail(email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }
    if (username.length === 0) {
      alert('El nombre de usuario no puede estar vacío.');
      return;
    }
    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    const db = dbRequest.result;
    const transaction = db.transaction('users', 'readwrite');
    const objectStore = transaction.objectStore('users');
    const request = objectStore.add({ username, email, password });

    request.onsuccess = () => {
      console.log('Usuario registrado con éxito');
      // redirection al usuario a la página principal

      
    };

    request.onerror = () => {
      if (request.error.name === 'ConstraintError') {
        alert('El nombre de usuario o correo electrónico ya está registrado.');
      } else {
        console.error('Error al registrar usuario', request.error);
      }
    };
  }

  function validateCredentials(username, password) {
    if (username.length === 0 || password.length === 0) {
      alert('El nombre de usuario y la contraseña no pueden estar vacíos.');
      return;
    }

    const db = dbRequest.result;
    const transaction = db.transaction('users', 'readonly');
    const objectStore = transaction.objectStore('users');
    const request = objectStore.get(username);

    request.onsuccess = () => {
      const user = request.result;
      if (user && user.password === password) {
        console.log('Inicio de sesión exitoso');
        // Aquí puedes redirigir al usuario a su página de perfil o donde necesite ir después del inicio de sesión
      } else {
        alert('Nombre de usuario o contraseña incorrecta.');
      }
    };

    request.onerror = () => {
      console.error('No se pudo verificar las credenciales del usuario', request.error);
    };
  }

  document.getElementById('signupBtn').addEventListener('click', () => {
    const email = document.getElementById('signupEmail').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    registerUser(email, username, password);
  });

  document.getElementById('signinBtn').addEventListener('click', () => {
    const username = document.getElementById('signinUsername').value.trim();
    const password = document.getElementById('signinPassword').value.trim();
    validateCredentials(username, password);
  });
});