

const socket = io();


console.log('Público HTML')

socket.on('ultimos4tickets', (ultimo4) => {
     console.log(ultimo4);
});
