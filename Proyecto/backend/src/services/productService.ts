import { Product } from "../models/productClass";
import { Database, ProductInterface } from "../models/interfaces/productInterface";
import productsData from "./../data/product.json";
import * as fs from 'fs';
import * as path from 'path';
import movementsData from "./../data/movements.json";
import { MovementInterface } from "../models/interfaces/movementInterface";

const DATA_FILE_PATH = path.join(__dirname, '..', 'data', 'product.json');
const MOVEMENT_FILE_PATH = path.join(__dirname, '..', 'data', 'movements.json');

const productInstances: Product[] = (productsData as Database).map((data: ProductInterface) => {
    return new Product(data.id, data.name, data.tipo, data.cantidad);
});

export class ProductService {

    private products: Product[] = productInstances;
    private movements: MovementInterface[] = movementsData as MovementInterface[];
    private nextId: number = Math.max(...this.products.map(p => p.getId()), 0) + 1;
    private nextMovementId: number = Math.max(... this.movements.map(m=>m.id), 0) + 1;
    
    private saveProductsToFile(): void {
        try {
            const productsToSave: ProductInterface[] = this.products.map(p => ({
                id: p.getId(),
                name: p.getName(),
                tipo: p.getTipo(),
                cantidad: p.getCantidad(),
            }));

            const jsonString = JSON.stringify(productsToSave, null, 2);
            
            fs.writeFileSync(DATA_FILE_PATH, jsonString, 'utf-8');
            
        } catch (error) {
            console.error("ERROR: No se pudo escribir en el archivo JSON:", error);
        }
    }

    private saveMovementsToFile(): void {
        try {
            const jsonString = JSON.stringify(this.movements, null, 2);
            fs.writeFileSync(MOVEMENT_FILE_PATH, jsonString, 'utf-8');
        } catch (error) {
            console.error("ERROR: No se pudo escribir en el log de movimientos:", error);
        }
    }

    private recordMovement(
        productId: number,
        productName: string,
        action: MovementInterface['action'],
        description: string,
        previousState?: any,
        newState?: any
    ): void {
        const newMovement: MovementInterface = {
            id: this.nextMovementId++,
            productId,
            productName,
            timestamp: new Date().toISOString(),
            action,
            description,
            previousState,
            newState,
        };

        this.movements.push(newMovement);
        this.saveMovementsToFile();
    }

    public getAllMovements(): MovementInterface[] {
        return this.movements.sort((a, b) => b.id - a.id);
    }

    public getAllProducts(): Product[] {
        return this.products; 
    }
    
    public getProductById(id: number): Product | undefined {
        return this.products.find(p => p.getId() === id);
    }
    
    public getProductsByType(tipo: string): Product[] {
        return this.products.filter(p => p.getTipo() === tipo);
    }
    
    public createProduct(data: Omit<ProductInterface, 'id'>): Product {
        const newId = this.nextId++;
        const newProduct = new Product(newId, data.name, data.tipo, data.cantidad);
        
        this.products.push(newProduct);
        this.saveProductsToFile(); 
        
        this.recordMovement(
            newProduct.getId(), 
            newProduct.getName(), 
            'CREATE', 
            `Producto creado con cantidad inicial de ${newProduct.getCantidad()}.`,
            undefined,
            { name: newProduct.getName(), tipo: newProduct.getTipo(), cantidad: newProduct.getCantidad() }
        );
        return newProduct;
    }
    
    public updateProduct(id: number, data: Partial<Omit<ProductInterface, 'id'>>): Product | undefined {
        const index = this.products.findIndex(p => p.getId() === id);
    
        if (index === -1) {
            return undefined;
        }
    
        const currentProduct = this.products[index];
        const previousState = { 
            name: currentProduct.getName(), 
            tipo: currentProduct.getTipo(), 
            cantidad: currentProduct.getCantidad() 
        };

        const updatedName = data.name !== undefined ? data.name : currentProduct.getName();
        const updatedTipo = data.tipo !== undefined ? data.tipo : currentProduct.getTipo();
        const updatedCantidad = data.cantidad !== undefined ? data.cantidad : currentProduct.getCantidad();
        
        let action: MovementInterface['action'] = 'UPDATE';
        let description = '';

        if (data.cantidad !== undefined && data.cantidad === 0 && currentProduct.getCantidad() > 0) {
            action = 'DISABLE';
            description = 'Producto inhabilitado (Stock establecido a 0).';
        } else if (data.cantidad !== undefined && data.cantidad > 0 && currentProduct.getCantidad() === 0) {
            action = 'ENABLE';
            description = `Producto habilitado, stock restaurado a ${data.cantidad}.`;
        } else {
            const changes = [];
        if (data.name !== undefined && data.name !== currentProduct.getName()) changes.push(`nombre de '${currentProduct.getName()}' a '${data.name}'`);
        if (data.tipo !== undefined && data.tipo !== currentProduct.getTipo()) changes.push(`categoría de '${currentProduct.getTipo()}' a '${data.tipo}'`);
        if (data.cantidad !== undefined && data.cantidad !== currentProduct.getCantidad()) {
            changes.push(`cantidad de ${currentProduct.getCantidad()} a ${data.cantidad}`);
        }
        
        description = changes.length > 0 ? `Datos actualizados: ${changes.join(', ')}.` : 'Actualización de datos menores.';
        }

        const updatedProduct = new Product(id, updatedName, updatedTipo, updatedCantidad);
        this.products[index] = updatedProduct;
        this.saveProductsToFile();

        this.recordMovement(
            id, 
            updatedProduct.getName(), 
            action, 
            description,
            previousState,
            { name: updatedProduct.getName(), tipo: updatedProduct.getTipo(), cantidad: updatedProduct.getCantidad() }
        );
        return updatedProduct;
    }

    public deleteProduct(id: number): boolean {
        const initialLength = this.products.length;
        const productToDelete = this.products.find(p => p.getId() === id);

        this.products = this.products.filter(p => p.getId() !== id);
        
        const deleted = this.products.length < initialLength;
        if (deleted && productToDelete) {
            this.saveProductsToFile(); 

            this.recordMovement(
                productToDelete.getId(), 
                productToDelete.getName(), 
                'DELETE', 
                'Producto eliminado permanentemente de la base de datos.',
                { name: productToDelete.getName(), tipo: productToDelete.getTipo(), cantidad: productToDelete.getCantidad() }
            );
        }
        return deleted;
    }
}

export const productService = new ProductService();