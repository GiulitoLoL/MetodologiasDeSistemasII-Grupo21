import { Tipo } from "../productClass";

export interface ProductInterface{
    id:number;
    name:string;
    tipo:Tipo;
    cantidad:number;
}

export type Database = ProductInterface[]