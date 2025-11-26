import { Product } from "../models/productClass";
import { Database, ProductInterface } from "../models/interfaces/productInterface";
import productsData from "./../data/product.json";
import * as fs from 'fs';
import * as path from 'path';

const DATA_FILE_PATH = path.join(__dirname, '..', 'data', 'product.json');
const productInstances: Product[] = (productsData as Database).map((data: ProductInterface) => {
    return new Product(data.id, data.name, data.tipo, data.cantidad);
});

export class ProductService {

    private products: Product[] = productInstances;
    
    private nextId: number = Math.max(...this.products.map(p => p.getId()), 0) + 1;
    
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
        return newProduct;
    }
    
    public updateProduct(id: number, data: Partial<Omit<ProductInterface, 'id'>>): Product | undefined {
        const index = this.products.findIndex(p => p.getId() === id);
    
        if (index === -1) {
            return undefined;
        }
    
        const currentProduct = this.products[index];
        
        const updatedName = data.name !== undefined ? data.name : currentProduct.getName();
        const updatedTipo = data.tipo !== undefined ? data.tipo : currentProduct.getTipo();
        const updatedCantidad = data.cantidad !== undefined ? data.cantidad : currentProduct.getCantidad();
        
        const updatedProduct = new Product(id, updatedName, updatedTipo, updatedCantidad);
        
        this.products[index] = updatedProduct;
        this.saveProductsToFile(); 
        return updatedProduct;
    }

    public deleteProduct(id: number): boolean {
        const initialLength = this.products.length;
        this.products = this.products.filter(p => p.getId() !== id);
        
        const deleted = this.products.length < initialLength;
        if (deleted) {
            this.saveProductsToFile(); 
        }
        return deleted;
    }
}

export const productService = new ProductService();