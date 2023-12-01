let HeadUser = null;


const sign_in_btn = document.getElementById("sign-in-btn");
const sign_up_btn = document.getElementById("sign-up-btn");
const container = document.querySelector(".container");


sign_up_btn.addEventListener('click', () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () => {
  container.classList.remove("sign-up-mode");
});


/////////////////////////////////// CON TOKEN ///////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  /* 
   En el contexto de bases de datos como IndexedDB, 
   la estructura de la base de datos maneja internamente 
   el hashing y la indexación para almacenar y recuperar 
   datos de manera eficiente.
  */
  // indexedDB funciona con hash table 
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

//////////// FUNCTION HASH TABLE ///////////////////////
  function simpleHash(input) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convertir a un entero de 32bit
    }
    return hash.toString();
  }

  function generateToken(username, email) {
    const rawToken = `${username}-${email}-${new Date().getTime()}`;
    return simpleHash(rawToken);
  }
////////////////////////////////////////////////////////////////

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

    const token = generateToken(username, email);

    const db = dbRequest.result;
    const transaction = db.transaction('users', 'readwrite');
    const objectStore = transaction.objectStore('users');
    const request = objectStore.add({ username, email, password, token });

    request.onsuccess = () => {
      localStorage.setItem('HeadUser', username);
      alert('Usuario registrado con éxito. Token:');
      // redirigir al usuario a la página de index.html
      window.location.href = '../index.html';
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
    console.log(request);
  
    request.onsuccess = () => {
      const user = request.result;
      localStorage.setItem('HeadUser', user.username);

  
      if (user) {
        // Si el usuario existe, verifica la contraseña
        if (user.password === password) {
          alert('Inicio de sesión exitoso');
          // redirigir al usuario a la página de index.html que está una carpeta arriba
          window.location.href = '../index.html';
        } else {
          alert('Contraseña incorrecta.');
        }
      } else {
        // Si el usuario no existe
        alert('Usuario no encontrado.');
      }
    };
  
    request.onerror = () => {
      console.error('No se pudo verificar las credenciales del usuario', request.error);
    };
  }
  const signupBtn = document.getElementById('signupBtn');
  signupBtn.addEventListener('click', () => {
    const email = document.getElementById('signupEmail').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    registerUser(email, username, password);
  });
  

  const signinBtn = document.getElementById('signinBtn');
  signinBtn.addEventListener('click', () => {
    const username = document.getElementById('signinUsername').value.trim();
    const password = document.getElementById('signinPassword').value.trim();
    validateCredentials(username, password);
  });
});

