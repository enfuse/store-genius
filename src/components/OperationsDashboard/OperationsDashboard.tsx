import * as React from 'react'
import {InventoryHealthPanel} from './InventoryHealthPanel'
import {InventoryNotes} from './InventoryNotes'
import  './types'
import { HealthStatus } from './types'
export const OperationsDashboard = () =>{

    const inventoryItems = [
        {name:"Alcohol ", status:HealthStatus.GOOD},
        {name:"Soft Drinks ",status:HealthStatus.UNDERSTOCK},
        {name:"Dairy ", status: HealthStatus.OVERSTOCK}
    ]
    return (
        <div className='operations-dashboard'>
                <InventoryHealthPanel inventoryItems={inventoryItems}/>
                {/* <InventoryNotes/> */}
        </div>
    )
}