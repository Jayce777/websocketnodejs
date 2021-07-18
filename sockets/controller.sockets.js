const TicketControl = require('../models/ticket-control');

const ticketcontrol = new TicketControl();


const socketcontroler = (socket) => {
    // console.log('cliente conectado!',socket.id);


    socket.emit('ultimoticket', 'Ticket ' + ticketcontrol.ultimo);
    socket.emit('ultimos4tickets', ticketcontrol.utlimostickets);
    socket.emit('tickets-encola', ticketcontrol.tickets.length);

    // socket.on('disconnect',()=>{
    //console.log('Cliente desconectado...');
    //s});
    socket.on('siguiente-ticket', (payload, callback) => {

        const siguiente = ticketcontrol.siguiente();
        socket.broadcast.emit('tickets-encola', ticketcontrol.tickets.length);
        callback(siguiente);

        //socket.broadcast.emit('enviar-mensaje',payload);
    });


    socket.on('atendernuevo-ticket', ({ escritorio }, callback) => {

        if (!escritorio) {

            return callback({
                resultado: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const atenderticket = ticketcontrol.atender(escritorio);

        //va mostrando los últimos 4 tickets a medida que se van atendiendo
        socket.broadcast.emit('ultimos4tickets', ticketcontrol.utlimostickets);

        //va mostrando los tickets pendientes de antención
        // console.log(ticketcontrol.tickets.length);
        socket.emit('tickets-encola', ticketcontrol.tickets.length);
        socket.broadcast.emit('tickets-encola', ticketcontrol.tickets.length);

        const numeroticketsencola=ticketcontrol.tickets.length;
        if (!atenderticket) {
            callback({
                resultado: false,
                msg: 'No existen tickets para atender',
                numeroticketsencola

            })
        } else {
            callback({
                resultado: true,
                msg: 'Ok',
                atenderticket,
                numeroticketsencola
            });

        }

    });


  


};


module.exports = {
    socketcontroler
}