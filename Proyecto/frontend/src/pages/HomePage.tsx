import ProductCard from "../components/ProductCards";
import { useState } from "react";
import './../stylesheets/input.css';
import { useProducts } from "../context/ProductContext";

const HomePage = () => {
    const { products, isLoading } = useProducts();

    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    if(isLoading){
        return <div>Cargando productos...</div>
    }

    if(products === null || products.length === 0){
        return <div>No hay productos en la base de datos.</div>
    }

    const filteredProducts = products.filter((product) => {
        const term = searchTerm.toLowerCase();
        
        return (
            product.name.toLowerCase().includes(term) ||
            product.tipo.toLowerCase().includes(term) 
        );
    });
    
    return (
        <div className = 'app'>
            <div className = "search-container">
                <input
                    type="text"
                    placeholder="Buscar por nombre o tipo..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            
            {filteredProducts.length === 0 && searchTerm !== '' ? (
                <div>No se encontraron productos que coincidan con la búsqueda.</div>
            ) : (
                <div className = 'product-list-container'>
                    {filteredProducts.map((product) => {
                        return (
                            <ProductCard 
                                key={product.id} 
                                name={product.name} 
                                tipo={product.tipo} 
                                cantidad={product.cantidad}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
};

export default HomePage;