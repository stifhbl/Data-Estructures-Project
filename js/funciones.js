
// Cola de alertas
/* 
  gestiona las alertas o mensajes que se muestran al usuario. 
  Por ejemplo, si tenemos múltiples alertas que se deben mostrar 
  secuencialmente, una cola puede asegurar que se muestren en 
  el orden correcto y por un tiempo determinado antes de 
  pasar a la siguiente.

*/
class Queue {
    constructor() {
      this.elements = [];
    }
  
    enqueue(element) {
      this.elements.push(element);
    }
  
    dequeue() {
      if (this.isEmpty()) return null;
      return this.elements.shift();
    }
  
    isEmpty() {
      return this.elements.length === 0;
    }
  
    peek() {
      if (this.isEmpty()) return null;
      return this.elements[0];
    }
  }
  
  const alertQueue = new Queue();
  
  // Modificar la función mostrarAlerta en funciones.js
  
  export function mostrarAlerta(mensaje) {
      alertQueue.enqueue(mensaje);
      if (alertQueue.elements.length === 1) {
          procesarAlerta();
      }
  }


  function procesarAlerta() {
    if (!alertQueue.isEmpty()) {
        const mensaje = alertQueue.peek();
        const alerta = document.createElement('p');

        alerta.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded",  "max-w-lg", "mx-auto", "mt-6", "text-center" );
    
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;
    
        formulario.appendChild(alerta);
        setTimeout(() => {
            alertQueue.dequeue();
            if (!alertQueue.isEmpty()) {
                procesarAlerta();
            }
        }, 3000);
    }
}

