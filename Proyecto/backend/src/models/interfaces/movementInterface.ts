export interface MovementInterface {
    id: number;
    productId: number;
    productName: string;
    timestamp: string;
    action: 'CREATE' | 'UPDATE' | 'DISABLE' | 'ENABLE' | 'DELETE';
    description: string; 
    previousState?: any;
    newState?: any;
}