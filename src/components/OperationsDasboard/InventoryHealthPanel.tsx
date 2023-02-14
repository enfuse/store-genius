import React, {PropsWithChildren} from 'react'
import {colors, Paper} from '@mui/material'
import ReactSpeedometer, {CustomSegmentLabelPosition, Transition} from "react-d3-speedometer"
import "./Operations.css"
import {InventoryHealthProps,InventoryItemProps,HealthStatus} from "./types"
import {scaleLinear} from 'd3-scale'
export const InventoryHealthPanel = ({inventoryItems}: PropsWithChildren<InventoryHealthProps>) =>{
    return (
        <div >
            <h2>Health</h2>
            <Paper elevation={3} sx={{minHeight: 200, paddingLeft:5, paddingTop:1}}>
                <div className='inventory-health-panel'>
                {inventoryItems?.map(inventoryItem => 
                    <InventoryItem key={inventoryItem.key} item={inventoryItem}/>
                    )}
                </div>
            </Paper>
        </div>
    )
}

const InventoryItem = ({item}: PropsWithChildren<InventoryItemProps>) => {
    const [value,setValue] = React.useState(getValueFromStatus(item?.status))
    console.log(value)
    const colorScale = scaleLinear<string>()
                        .domain([1,25,40,55,80])
                        .range(["red","yellow","green","yellow","red"])
    let colors : any[] = generateColors(colorScale)
    
    return (
     <div className='inventory-item'>
        <h2 style={{display:'block'}}>{item?.name}</h2>
        <ReactSpeedometer
            width={200}
            height={180}
            needleHeightRatio={0.5}
            value={value} 
            segmentColors={colors}
            currentValueText={item?.status}
            maxSegmentLabels={0}
            segments={80}

            // customSegmentLabels={[
            //     {text:""},
            //     {text:""},
            //     {text:""},
            //     {text:""},
            //     {text:""},
            // ]}
            ringWidth={15}
            needleTransitionDuration={3000}
            needleTransition={Transition.easeElastic}
            needleColor={'#142E0E'}
        /> 
            </div>
    )
}

const getValueFromStatus = (status:HealthStatus|undefined)=>{
    switch(status){
        case HealthStatus.GOOD:
            return 500
        case HealthStatus.UNDERSTOCK:
            return 100
        case HealthStatus.OVERSTOCK: 
            return 900
        default:
            return 0
    }
}

const generateColors = (colorScale: any) : any[]=>{
    const colors: any[] = []
    for (let i = 0; i < 80  ; i++) {
        colors.push(colorScale(i))
      }
    return colors
}