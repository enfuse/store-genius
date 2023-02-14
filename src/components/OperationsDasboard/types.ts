export interface InventoryHealthProps {
    inventoryItems?: any[];
  }
export interface InventoryItemProps {
    item?: InventoryItem;
  }
export type InventoryItem = {
    name:string
    status:HealthStatus
}
export enum HealthStatus {
    UNDERSTOCK = 'Under Stock',
    GOOD = 'Good',
    OVERSTOCK = 'Over Stock'
}