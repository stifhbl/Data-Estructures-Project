import { obtenerClientes, eliminarCliente} from './API.js';


// linked list
class ListNode {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
    }
  
    add(data) {
      const newNode = new ListNode(data);
      if (!this.head) {
        this.head = newNode;
        return;
      }
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  
    // Método para iterar sobre la lista
    forEach(callback) {
      let current = this.head;
      while (current) {
        callback(current.data);
        current = current.next;
      }
    }
  }

(function() {

    const listado = document.querySelector('#listado-clientes');
    listado.addEventListener('click', confirmarEliminar);


    document.addEventListener('DOMContentLoaded', () => { 
        mostrarClientes(); 
        changeTextInSesionButton();
    });


    async function mostrarClientes() {
        const clientes = await obtenerClientes();
        const listaClientes = new LinkedList();
        
        clientes.forEach(cliente => listaClientes.add(cliente));
        
        listaClientes.forEach(cliente => {
          const { nombre, email, telefono, empresa, id } = cliente;
            const row = document.createElement('tr');

            row.innerHTML += `
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                    <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                    <p class="text-gray-700">${telefono}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                    <p class="text-gray-600">${empresa}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                    <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                    <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                </td>
            `;

            listado.appendChild(row);
        })
    }

   async function confirmarEliminar(e) {
        if( e.target.classList.contains('eliminar') ) {
            const clienteId = parseInt( e.target.dataset.cliente)
            console.log(clienteId);
            const confirmar = confirm('¿Deseas eliminar este cliente?');

            if(confirmar) {
                await eliminarCliente(clienteId)
            }

        }
    }

    function changeTextInSesionButton(){;
        const HeadUser = localStorage.getItem('HeadUser');
        const sesionBtn = document.getElementById('boton-sesion');
    
        if (HeadUser && sesionBtn) {
            sesionBtn.innerHTML = HeadUser;
        } else {
            sesionBtn.innerHTML = 'Iniciar Sesión';
        }
    }

})();

