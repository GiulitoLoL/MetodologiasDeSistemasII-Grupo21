export type Tipo = "bebida" | "comida" | "higiene" | "especias";

export class Product{
    protected id:number;
    protected name:string;
    protected tipo:Tipo;
    protected cantidad:number;
    
    constructor(id:number, name:string, tipo:Tipo, cantidad:number){
        this.id = id;
        this.name = name;
        this.tipo = tipo;
        this.cantidad = cantidad;
    };

    public getId(){
        return this.id
    }
    public getName(){
        return this.name
    }

    public getTipo(){
        return this.tipo
    }

    public getCantidad(){
        return this.cantidad
    }
}