const TicketControl = require('../models/ticket-control');

const ticketcontrol=new TicketControl();


const socketcontroler= (socket) => {
    // console.log('cliente conectado!',socket.id);

    socket.emit('ultimoticket','Ticket '+ticketcontrol.ultimo);
    // socket.on('disconnect',()=>{
         //console.log('Cliente desconectado...');
     //s});
     socket.on('siguiente-ticket',(payload,callback)=>{
        
         const siguiente=ticketcontrol.siguiente();
         callback(siguiente);

         //socket.broadcast.emit('enviar-mensaje',payload);
     });

     socket.emit('ultimos4tickets',ticketcontrol.utlimostickets);
 };


module.exports={
    socketcontroler
}