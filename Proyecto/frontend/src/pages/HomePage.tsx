import ProductCard from "../components/ProductCards";
import { useState } from "react";
import './../stylesheets/input.css';
import { useProducts } from "../context/ProductContext";

const HomePage = () => {
    const { products, isLoading } = useProducts();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedType, setSelectedType] = useState('all');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const getUniqueTypes = () => {
        if (!products || products.length === 0) { return ['all'];};
        const types = new Set(products.map(p => p.tipo));
        return ['all', ...Array.from(types)]; 
    };

    const uniqueTypes = getUniqueTypes();

    if(isLoading){
        return <div>Cargando productos...</div>
    }

    if(products === null || products.length === 0){
        return <div>No hay productos en la base de datos.</div>
    }

    const filteredProducts = products.filter((product) => {
        const nameTerm = searchTerm.toLowerCase();
        
        const matchesName = product.name.toLowerCase().includes(nameTerm);

        const matchesType = selectedType === 'all' || product.tipo === selectedType;

        return matchesName && matchesType;
    });
    
    return (
        <div className = 'app'>
            <div className = "search-container">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="type-select"
                >
                    {uniqueTypes.map((type) => (
                        <option key={type} value={type}>
                            {type === 'all' ? 'Todas las Categorías' : type}
                        </option>
                    ))}
                </select>
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