//socket del cliente
const socket=io();  

const mensaje   =document.querySelector('#txtmensaje');
const btnenviar =document.querySelector('#btnenviar');
const online    =document.querySelector('#lblonline');
const offline   =document.querySelector('#lbloffline');
const txtbody =document.querySelector('#txtbody');


socket.on('connect',()=>{

    offline.style.display='none';
    online.style.display='';
    //console.log('conectado desde el cliente');

});

socket.on('disconnect',()=>{

    online.style.display='none';
    offline.style.display='';
   // console.log('desconectado desde el cliente');
});


socket.on('enviar-mensaje',(respuesta)=>{
    //console.log(respuesta);
    const {msg}=respuesta;
    console.log(msg);

    const node = document.createElement("LI"); 
    node.style.backgroundColor ='silver';
   // node.style.color ='white';
    node.style.borderRadius  ='5px'; 
    node.style.marginBottom = '5px';
    const textnode = document.createTextNode(msg);         // Create a text node
    node.appendChild(textnode);                              // Append the text to <li>
    txtbody.appendChild(node);

});

btnenviar.addEventListener('click',()=>{

    const msg=mensaje.value;

   const node = document.createElement("LI");
    node.style.backgroundColor ='lightblue';
   // node.style.color ='white';
   node.style.marginBottom = '5px';
    node.style.borderRadius  ='5px';

    const textnode = document.createTextNode(msg);         // Create a text node
    node.appendChild(textnode);                              // Append the text to <li>
    txtbody.appendChild(node);

    const payload={

        msg,
        id:'12345',
        fecha:new Date().getTime()
    }

    mensaje.value='';
    //console.log(msg);
    socket.emit('enviar-mensaje',payload,(id)=>{
        console.log('id mensaje',id);

    });

});