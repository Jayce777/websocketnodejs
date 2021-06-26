require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { socketcontroler } = require('../sockets/controller.sockets');


//configuración conexiones

class Server{

    constructor(){
        this.app    = express();
        this.port   =process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io     =require('socket.io')(this.server);

        //Middlewares
        this.middlewarepublic();

        //dispara las rutas
       // this.routes();
        
       this.sockets();
    }

    middlewarepublic(){

        this.app.use(express.static('public'));

        this.app.use(cors());

        this.app.use(express.json());
    }

    sockets(){
        this.io.on('connection',socketcontroler);
    }
  
    //funciones para las rutas
    routes(){

       
    }

    listen(){
        
        this.server.listen(this.port, () => {
            console.log(`REST Server esuchando en puerto: ${this.port}`);
        });
    }
}


module.exports=Server;