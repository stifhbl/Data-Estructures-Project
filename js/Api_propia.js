/*
    GRAFOS:
    Aplicación Práctica:
    Por ejemplo, podemos utilizar el 
    grafo para visualizar cómo los clientes 
    están conectados, lo cual podría ser 
    útil para análisis de marketing o de red de ventas.
    todo esto se envía como Metadata con la API propia

*/

class GraphNode {
    constructor(value) {
      this.value = value;
      this.edges = [];
    }
  
    connect(node) {
      this.edges.push(node);
      node.edges.push(this); // Para un grafo no dirigido
    }
  }
  
  class Graph {
    constructor() {
      this.nodes = [];
    }
  
    addNode(value) {
      const newNode = new GraphNode(value);
      this.nodes.push(newNode);
      return newNode;
    }
  
    // Métodos adicionales para buscar nodos, recorrer el grafo, etc.
  }
  
  // Ejemplo de uso
  const clientesGraph = new Graph();
  const clienteA = clientesGraph.addNode('Cliente A');
  const clienteB = clientesGraph.addNode('Cliente B');
  clienteA.connect(clienteB);
  // Y así sucesivamente para representar las conexiones entre clientes

