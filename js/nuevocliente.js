import {nuevoCliente } from './API.js';
import { mostrarAlerta } from './funciones.js';


/*  PILA
    tiene como objetivo revertir los cambios 
    realizados en el formulario al estado anterior.
*/

class Stack {
    constructor() {
      this.items = [];
    }
  
    push(item) {
      this.items.push(item);
    }
  
    pop() {
      if (this.isEmpty()) return null;
      return this.items.pop();
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  
    peek() {
      if (this.isEmpty()) return null;
      return this.items[this.items.length - 1];
    }
  }
  
  const cambiosFormulario = new Stack();
  
  // funcionalidad de historial en el formulario
  
  function guardarCambio() {
    const cliente = {
      nombre: document.querySelector('#nombre').value,
      email: document.querySelector('#email').value,
      telefono: document.querySelector('#telefono').value,
      empresa: document.querySelector('#empresa').value
    };
    cambiosFormulario.push(cliente);
  }
  
  function deshacerUltimoCambio() {
    cambiosFormulario.pop();
    if (!cambiosFormulario.isEmpty()) {
      const ultimo = cambiosFormulario.peek();
      document.querySelector('#nombre').value = ultimo.nombre;
      document.querySelector('#email').value = ultimo.email;
      document.querySelector('#telefono').value = ultimo.telefono;
      document.querySelector('#empresa').value = ultimo.empresa;
    } else {
      // Resetear el formulario si no hay más cambios en la pila
      document.querySelector('#formulario').reset();
    }
  }
  


(function() {
    const formulario = document.querySelector('#formulario');

    // registra el formulario
    formulario.addEventListener('submit', validarCliente);

    // Event listener para deshacer cambios
    document.querySelector('#deshacer-cambio').addEventListener('click', deshacerUltimoCambio);

    // Event listener para cambios en el formulario
    formulario.addEventListener('change', guardarCambio);


    async function validarCliente(e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        const cliente = {
            nombre, 
            email, 
            telefono,
            empresa
        }

        if( validar(cliente) ) {
            mostrarAlerta('Todos los campos son obligatorios');
            return;
        }
        await nuevoCliente(cliente);
        window.location.href = 'index.html';
    }

    function validar(obj) {
        return !Object.values(obj).every(element => element !== '') ;
    }

   
})();