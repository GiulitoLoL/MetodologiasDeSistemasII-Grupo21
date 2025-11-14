import ProductCard from "./components/ProductCards";
import { useState, useEffect } from "react";

interface Product{
        id:number;
        name:string;
        tipo:string;
        cantidad:number;
    }

const App = () => {
    const [product, setProducts] = useState < Product[] | null >(null);

    useEffect(() => {
        fetch("/api/products")
            .then((response) => response.json())
            .then(data => setProducts(data))
            .catch((err) => console.log(err));
    }, [])

    if(product === null){
        return <div>No hay productos</div>
    }
    return (
        <div className = 'app'>
            {product.map((product) => {
                return <ProductCard key = {product.id} name = {product.name} tipo = {product.tipo} cantidad = {product.cantidad}/>
            })}
        </div>
    )
};

export default App;