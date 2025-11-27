import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from "../context/ProductContext";
import { ProductForm } from '../components/ProductForm';


const ProductManagementPage = () => {
    const navigate = useNavigate();
    const { productId } = useParams();
    const { products, isLoading, refreshProducts } = useProducts();
    
    if (isLoading) {
        return <div>Cargando la lista para gestión...</div>;
    }
    
    if (products === null) {
        return <div>Error: No se pudo cargar la lista de productos para gestión.</div>;
    }

    const productToModify = products.find(p => p.id === Number(productId));
    const isEditing = !!productId;
    
    
    const handleModifyClick = (id: number) => {
        navigate(`/gestion-productos/${id}`);
    };
    
    const handleInhabilitar = async (id: number, name: string) => {
        if (!window.confirm(`¿Estás seguro de inhabilitar el producto "${name}"? (Establecer cantidad a 0)`)) {
            return;
        }

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cantidad: 0 }),
            });

            if (!response.ok) {
                const errorData = await response.json(); 
                throw new Error(errorData.message || `Error al inhabilitar: ${response.status}`);
            }

            const contentType = response.headers.get("content-type");
            
            if (contentType && contentType.includes("application/json")) {
                await response.json();
            }

            refreshProducts();
            alert(`Producto actualizado con éxito.`);

            window.location.reload();

        } catch (err) {
            console.error("Error de API:", err);
            alert(`Fallo al inhabilitar el producto "${name}": ${err instanceof Error ? err.message : "Error desconocido"}`); 
        }
    };
    
    return (
        <div className='product-management-page'>
            <h1>Administración de Stock</h1>
            
            {!isEditing && (
                <>
                    <ProductForm refreshProducts={refreshProducts} /> 
                    
                    <h2>Lista para Modificar o Inhabilitar</h2>
                    <ul>
                        {products.map((p) => (
                            <li key={p.id}>
                                {p.name} (Stock: **{p.cantidad}**)
                                <button onClick={() => handleModifyClick(p.id)} style={{ margin: '0 10px' }}>
                                    ✍️ Modificar
                                </button>
                                {p.cantidad > 0 ? (
                                    <button onClick={() => handleInhabilitar(p.id, p.name)}>
                                        ❌ Establecer Stock 0 (Inhabilitar)
                                    </button>
                                ) : (
                                    <span style={{ color: 'red', marginLeft: '10px' }}>🚫 Inhabilitado</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {isEditing && productToModify && (
                <ProductForm initialData={productToModify} refreshProducts={refreshProducts} />
            )}

            {isEditing && !productToModify && (
                <div>Producto no encontrado para modificar.</div>
            )}
            
            <button onClick={() => navigate('/')} style={{ marginTop: '20px' }}>Volver al Stock Principal</button>
        </div>
    );
};

export default ProductManagementPage;