const path=require('path');
const fs=require('fs');


class Ticket{
    
    constructor(numero,escritorio) {
        this.numero=numero;
        this.escritorio=escritorio;
    }
}


class TicketControl {


    constructor() {

        this.ultimo = 0;
        this.fechaactual = new Date().getDate();
        this.tickets = [];
        this.utlimostickets = [];


        this.init();
    }


    get toJson(){

        return{
           ultimo:this.ultimo,
            fechaactual: this.fechaactual,
            tickets :this.tickets,
            utlimostickets :this.utlimostickets
        }
    };

    //se ejecuta al iniciar la aplicación
    init(){

        const {fechaactual,tickets,ultimo,utlimostickets}=require('../db/data.json');

        if(fechaactual===this.fechaactual){
            this.tickets=tickets;
            this.ultimo=ultimo;
            this.utlimostickets=utlimostickets;
        }else{

            this.guardarDB();
        }
    }

    //guardar info en archivo .json
    guardarDB(){

        const pathdb=path.join(__dirname,'../db/data.json');

        fs.writeFileSync(pathdb,JSON.stringify(this.toJson));
    }


    siguiente(){

        this.ultimo+=1;
        const ticket=new Ticket(this.ultimo,null);
        this.tickets.push(ticket);

        this.guardarDB();

        return 'Ticket '+ this.ultimo;
    }

    atender(escritorio){

        //Si no existen tickets
        if(this.tickets.length===0){

            return null;
        }

        //Quitar el primer item del arreglo
        const ticket =this.tickets.shift();
        ticket.escritorio=escritorio;

        //Agrega el ticket al arreglo de últimos tickets
        this.utlimostickets.unshift(ticket);

        //Validar si existen más de 4 tickets

        if(this.utlimostickets.length>4){
            //Remover el útlimo item del arreglo
            this.utlimostickets.splice(-1,1);
        }
        
        this.guardarDB();
        return ticket;

    }
};


module.exports=TicketControl;