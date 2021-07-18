//Referencias HTML

const puestoEscritorio=document.querySelector('.mt-5');
const btnatender=document.querySelector("button");
const txtticket=document.querySelector("#txtticket");
const lblatendiendo=document.querySelector("#lblatendiendo");
const alerta=document.querySelector(".alert");
const lblPendientes=document.querySelector("#lblPendientes");


const socket = io();

const searchParams=new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location='index.html';
    throw new Error('El escritorio es olbigatorio');

}
const escritorio=searchParams.get('escritorio');

puestoEscritorio.innerHTML=escritorio;
alerta.style.display='none';

socket.on('connect', () => {
    // console.log('Conectado');
    btnatender.disabled=false;
});

socket.on('ultimoticket', (ultimo) => {
    // console.log('Conectado');
    //lblNuevoTicket.innerHTML=ultimo;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnatender.disabled=true;

});

socket.on('tickets-encola', (ticketsencola)=> {
    
    if(ticketsencola==0){

        alerta.style.display='';
        alerta.innerHTML='No existen tickets para atender';
        btnatender.disabled=true;
        lblPendientes.style.display='none';  
       
    }else{

        alerta.style.display='none';
        btnatender.disabled=false;
        lblPendientes.style.display='';    
        lblPendientes.innerHTML=ticketsencola;
       
    }
});

btnatender.addEventListener( 'click', () => {

    socket.emit('atendernuevo-ticket', {escritorio }, ( ticketatender ) => {
          
       // console.log(ticketatender);
        const {resultado,msg,numeroticketsencola}=ticketatender;
      //  console.log(numeroticketsencola);

        if(resultado){

            if(numeroticketsencola==0){

                btnatender.disabled=true;

            }else{
                const {atenderticket:{numero}}=ticketatender;
                txtticket.innerHTML='Ticket '+numero;
                btnatender.disabled=false;
                alerta.style.display='none';
            }
        

        }else{

            alerta.style.display='';
            alerta.innerHTML=msg;
            txtticket.innerHTML='Ninguno...';
            btnatender.disabled=true;

        }
    });

});


