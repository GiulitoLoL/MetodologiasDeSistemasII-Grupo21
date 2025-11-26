import { Request, Response } from 'express';
import { productService } from '../services/productService';
import { Tipo } from '../models/productClass';

const validTypes: Tipo[] = ["bebida", "comida", "higiene", "especias"];

export class ProductController {
    
    public listProducts(req: Request, res: Response): void {
        try {
            const products = productService.getAllProducts();
            
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener la lista de productos." });
        }
    }
    
    public getProductById(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ message: "El ID debe ser un número." });
                return;
            }
            
            const product = productService.getProductById(id);
            
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: `Producto con ID ${id} no encontrado.` });
            }
        } catch (error) {
            res.status(500).json({ message: "Error al buscar el producto." });
        }
    }
    
    public getProductByType(req: Request, res: Response): void{
        try{
            const tipo = req.params.tipo;
            
            if (!validTypes.includes(tipo as Tipo)) {
                res.status(400).json({ message: `Tipo de producto inválido: ${tipo}. Tipos válidos: ${validTypes.join(', ')}` });
            }
            
            const products = productService.getProductsByType(tipo);
            res.status(200).json(products); 
            
        } catch (error) {
            console.error("Error al obtener productos por tipo:", error);
            res.status(500).json({ message: "Error interno del servidor al filtrar productos." });
        }
    }
    
    public createProduct(req: Request, res: Response): void {
        try {
            const { name, tipo, cantidad } = req.body;
            
            if (!name || !tipo || cantidad === undefined || typeof name !== 'string' || typeof cantidad !== 'number' || isNaN(cantidad)) {
                res.status(400).json({ message: "Datos de entrada inválidos. Se requieren 'name' (string), 'tipo' (string) y 'cantidad' (number)." });
            }
            
            if (!validTypes.includes(tipo as Tipo)) {
                res.status(400).json({ message: `Tipo de producto inválido: ${tipo}. Tipos válidos: ${validTypes.join(', ')}` });
            }
            
            const newProduct = productService.createProduct({ name, tipo, cantidad });
            
            res.status(201).json(newProduct);
            
        } catch (error) {
            console.error("Error al crear producto:", error);
            res.status(500).json({ message: "Error interno del servidor al crear el producto." });
        }
    }

    public updateProduct(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id);
            const dataToUpdate = req.body;

            if (isNaN(id)) { res.status(400).json({ message: "El ID del producto debe ser un número válido." }); }

            if (Object.keys(dataToUpdate).length === 0) {
                res.status(400).json({ message: "Se requiere al menos un campo para actualizar (name, tipo, cantidad)." });
            }
            
            if (dataToUpdate.tipo && !validTypes.includes(dataToUpdate.tipo as Tipo)) {
                res.status(400).json({ message: `Tipo de producto inválido: ${dataToUpdate.tipo}. Tipos válidos: ${validTypes.join(', ')}` });
            }

            if (dataToUpdate.cantidad !== undefined && (typeof dataToUpdate.cantidad !== 'number' || isNaN(dataToUpdate.cantidad))) {
                res.status(400).json({ message: "El campo 'cantidad' debe ser un número." });
            }
            
            const updatedProduct = productService.updateProduct(id, dataToUpdate);
            
            if (updatedProduct) {
                res.status(200).json(updatedProduct);
            } else {
                res.status(404).json({ message: `Producto con ID ${id} no encontrado para actualizar.` });
            }

        } catch (error) {
            console.error("Error al actualizar producto:", error);
            res.status(500).json({ message: "Error interno del servidor al actualizar el producto." });
        }
    }

    public deleteProduct(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) { res.status(400).json({ message: "El ID del producto debe ser un número válido." }); }

            const deleted = productService.deleteProduct(id);
            
            if (deleted) {
                // 204 No Content (eliminación exitosa sin cuerpo de respuesta)
                res.status(204).send();
            } else {
                res.status(404).json({ message: `Producto con ID ${id} no encontrado para eliminar.` });
            }

        } catch (error) {
            console.error("Error al eliminar producto:", error);
            res.status(500).json({ message: "Error interno del servidor al eliminar el producto." });
        }
    }
}