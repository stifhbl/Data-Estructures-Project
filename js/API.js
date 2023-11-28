const url = "http://localhost:4000/clientes";

export const nuevoCliente = async cliente => {
    try {
        await fetch(url, {
            method: 'POST', 
            body: JSON.stringify(cliente), // data puede ser string o un objeto
            headers:{
              'Content-Type': 'application/json' // Y le decimos que los datos se enviaran como JSON
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const obtenerClientes = async () => {
    try {
        const resultado = await fetch(url);
        const clientes = await resultado.json();
        return clientes;
    } catch (error) {
        console.log(error);
    }
}

export const obtenerCliente = async id => {
    try {
        const resultado = await fetch(`${url}/${id}`);
        const cliente = await resultado.json();
        return cliente;
    } catch (error) {
        console.log(error);
    }
}


export const editarCliente = async cliente => {
    try {
        await fetch(`${url}/${cliente.id}`, {
            method: 'PUT', 
            body: JSON.stringify(cliente), // data puede ser string o un objeto
            headers:{
              'Content-Type': 'application/json' // Y le decimos que los datos se enviaran como JSON
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const eliminarCliente = async id => {
    try {
        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.log(error);
    }
}

// const apiKey = 'mlsn.fe8ab1dd51b605a62ef4395fd376f4a1c09aac4598facf877a8dbeb6c065a4bd';

// fetch('https://api.mailersend.com/v1/email', {
//   method: 'POST',
//   headers: {
//     'Authorization': `Bearer ${apiKey}`,
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     // Detalles del correo electrónico aquí
//   }),
// })
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error('No se pudo enviar el correo electrónico');
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log('Correo electrónico enviado con éxito', data);
//   })
//   .catch((error) => {
//     console.error('Error al enviar el correo electrónico:', error);
//   });



