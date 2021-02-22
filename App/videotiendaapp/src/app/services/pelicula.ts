export class Pelicula{
    IdPelicula:number;
    Titulo:string;
    Descripcion:string;
    Actores:string;
    Director:string;
    CostoAlquiler:number;
    Cantidad:number;
    constructor(){
        this.IdPelicula=0;
        this.Titulo='';
        this.Descripcion='';
        this.Director='';
        this.CostoAlquiler=0;
        this.Cantidad=0;
    }
}