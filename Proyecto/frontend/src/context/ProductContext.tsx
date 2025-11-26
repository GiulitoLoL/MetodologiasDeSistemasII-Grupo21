import React, { 
    createContext, 
    useState, 
    useEffect, 
    useContext 
} from 'react';
import type { ProductInterface } from "../interfaces/productInterface";

interface ProductContextType {
    products: ProductInterface[] | null;
    isLoading: boolean;
    refreshProducts: () => void; 
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [products, setProducts] = useState<ProductInterface[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchTrigger, setFetchTrigger] = useState(0); 

    const fetchProducts = () => {
        setIsLoading(true);
        fetch("/api/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al cargar productos');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setProducts(null);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchTrigger]);

    const refreshProducts = () => setFetchTrigger(prev => prev + 1);

    return (
        <ProductContext.Provider value={{ products, isLoading, refreshProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};