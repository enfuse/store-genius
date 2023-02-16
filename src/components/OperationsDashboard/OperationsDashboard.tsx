import * as React from 'react'
import {InventoryHealthPanel} from './InventoryHealthPanel'
import {InventoryNotes} from './InventoryNotes'
import  './types'
import { HealthStatus } from './types'
export  const  OperationsDashboard = () =>{

    const inventoryItems = [
        {id:"alcohol",name:"Alcohol ", status:HealthStatus.GOOD},
        {id:"soft-drinks",name:"Soft Drinks ",status:HealthStatus.UNDERSTOCK},
        {id:"dairy",name:"Dairy ", status: HealthStatus.OVERSTOCK}
    ]
    return (
        <div className='operations-dashboard' data-testid="operations-dasboard">
                <InventoryHealthPanel inventoryItems={inventoryItems}/>
                {/* <InventoryNotes/> */}
        </div>
    )
}