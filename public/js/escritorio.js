
const socket = io();
const searchParams=new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location='index.html';
    throw new Error('El escritorio es olbigatorio');

}
const escritorio=searchParams.get('escritorio');



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
//console.log(escritorio);