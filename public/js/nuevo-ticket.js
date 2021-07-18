//Referencias HTML

const lblNuevoTicket=document.querySelector("#lblNuevoTicket");
const btnbotn=document.querySelector("button");


const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    btnbotn.disabled=false;
});

socket.on('ultimoticket', (ultimo) => {
    // console.log('Conectado');
    lblNuevoTicket.innerHTML=ultimo;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnbotn.disabled=true;

});


btnbotn.addEventListener( 'click', () => {

    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
       // console.log(ticket );
        lblNuevoTicket.innerHTML=ticket;
    });

});