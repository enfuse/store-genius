export interface InventoryHealthProps {
    inventoryItems?: any[];
  }
export interface InventoryItemProps {
    key: string
    item?: InventoryItem;
    onClick: (id:string)=>void
    selected?:boolean
  }
export interface InventoryItem {
    id:string
    name:string
    status:HealthStatus
}
export enum HealthStatus {
    UNDERSTOCK = 'Under Stock',
    GOOD = 'Good',
    OVERSTOCK = 'Over Stock'
}

export interface InventoryItemSummaryProps {
  inventoryItemId: string
}
export interface ProductDetailProps {
  sectionId:string
}