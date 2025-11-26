import React, { useState, useEffect } from 'react';
import type { ProductInterface } from "../interfaces/productInterface";
import { useNavigate } from 'react-router-dom';

interface ProductFormProps {
    initialData?: ProductInterface;
    refreshProducts: () => void;
}

// Tipos de producto válidos según tu backend
const validTypes: ('bebida' | 'comida' | 'higiene' | 'especias')[] = ["bebida", "comida", "higiene", "especias"];

export const ProductForm: React.FC<ProductFormProps> = ({ initialData, refreshProducts }) => {
    const navigate = useNavigate();
    const isEditMode = !!initialData;

    const [formData, setFormData] = useState<Omit<ProductInterface, 'id'>>({
        name: initialData?.name || '',
        tipo: initialData?.tipo || 'bebida',
        cantidad: initialData?.cantidad || 0,
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                tipo: initialData.tipo,
                cantidad: initialData.cantidad,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'cantidad' ? parseInt(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!formData.name.trim() || !formData.tipo || formData.cantidad < 0) {
            setError('Todos los campos son requeridos y la cantidad debe ser válida.');
            setLoading(false);
            return;
        }

        const method = isEditMode ? 'PUT' : 'POST';
        const url = isEditMode ? `/api/products/${initialData!.id}` : '/api/products';
        
        const body = JSON.stringify(formData);

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error en la operación: ${response.status}`);
            }

            refreshProducts(); 
            alert(`Producto ${isEditMode ? 'modificado' : 'agregado'} con éxito.`);
            navigate('/');

        } catch (err) {
            console.error("Error de API:", err);
            setError(err instanceof Error ? err.message : "Error desconocido al contactar la API.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>{isEditMode ? `Modificar ${initialData!.name}` : '➕ Agregar Nuevo Producto'}</h2>
            
            {error && <div style={{ color: 'red' }}>{error}</div>}

            <div>
                <label>Nombre:</label>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    disabled={loading}
                />
            </div>
            
            <div>
                <label>Tipo:</label>
                <select 
                    name="tipo" 
                    value={formData.tipo} 
                    onChange={handleChange}
                    disabled={loading}
                >
                    {validTypes.map(t => (
                        <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                </select>
            </div>
            
            <div>
                <label>Cantidad (Stock):</label>
                <input 
                    type="number" 
                    name="cantidad" 
                    value={formData.cantidad} 
                    onChange={handleChange}
                    min="0"
                    disabled={loading}
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'Procesando...' : (isEditMode ? 'Guardar Cambios' : 'Crear Producto')}
            </button>
        </form>
    );
};