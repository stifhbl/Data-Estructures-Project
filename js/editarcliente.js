import {obtenerCliente, editarCliente } from './API.js';
import { mostrarAlerta } from './funciones.js';


// Árbol de acciones de edición 
/* 
     implementamos un árbol para registrar y gestionar 
     las distintas etapas o decisiones tomadas durante 
     la edición de un cliente. Esto podrá ser útil para 
     realizar un seguimiento de las acciones realizadas y, 
     potencialmente, para deshacer o revisar pasos 
     específicos en el proceso de edición esto seria metadata
     para la API propia de este CRM.

*/

class TreeNode {
    constructor(action, data) {
      this.action = action;
      this.data = data;
      this.children = [];
    }
  }
  
  class ActionTree {
    constructor() {
      this.root = new TreeNode('Inicio de edición', {});
    }
  
    addNode(action, data, parent) {
      const newNode = new TreeNode(action, data);
      parent.children.push(newNode);
      return newNode;
    }
  
    // Puedes agregar métodos adicionales para recorrer o buscar en el árbol
  }
  
  const editActionTree = new ActionTree();
  
  // Ejemplo de cómo añadir un nodo al árbol
  // Esta lógica se añadiría en las partes del código donde se realiza una acción de edición
  
  function registrarAccion(action, data) {
    const currentNode = editActionTree.addNode(action, data, editActionTree.root);
    // Puedes usar currentNode para referenciar acciones específicas
  }


(function() {


    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');
    const idInput = document.querySelector('#id');

    document.addEventListener('DOMContentLoaded', async () => {
        // Verificar si el cliente existe
        const parametrosURL = new URLSearchParams(window.location.search);
        const idCliente = parseInt( parametrosURL.get('id') );
        
        const cliente = await obtenerCliente(idCliente)
        mostrarCliente(cliente);
       
        // registra el formulario
        const formulario = document.querySelector('#formulario');
        formulario.addEventListener('submit', validarCliente);
       
    });

    function mostrarCliente(cliente) {
        const { nombre, empresa, email, telefono, id} = cliente;

        nombreInput.value = nombre;
        empresaInput.value = empresa;
        emailInput.value = email;
        telefonoInput.value = telefono;
        idInput.value = id;

        // Registrar la acción de mostrar cliente
        registrarAccion('Mostrar cliente', cliente)
    }


    async function validarCliente(e) {
        e.preventDefault();
        const cliente = {
            nombre: nombreInput.value, 
            email: emailInput.value, 
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: parseInt(idInput.value)
        }
        if( validar(cliente) ) {
            mostrarAlerta('Todos los campos son obligatorios');
            return;
        }

        // Registrar la acción de validar cliente
        registrarAccion('Validar cliente', cliente);

        await editarCliente(cliente);
        window.location.href = 'index.html';
    }


    function validar(obj) {
        return !Object.values(obj).every(element => element !== '') ;
    }
})();