export interface ProductInterface{
        id:number;
        name:string;
        tipo:'bebida' | 'comida' | 'higiene' | 'especias';
        cantidad:number;
}