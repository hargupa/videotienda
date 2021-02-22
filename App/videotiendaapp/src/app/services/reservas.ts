export class Reserva{
    IdReserva:number;
    IdCliente:number;
    IdPelicula:number;
    Fecha:string;
        constructor(){
            this.IdReserva=0;
            this.IdCliente=0;
            this.IdPelicula=0;
            this.Fecha='';
        }
}