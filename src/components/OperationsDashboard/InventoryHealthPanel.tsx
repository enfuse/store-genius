import React, {PropsWithChildren, useState, useEffect} from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import ReactSpeedometer, {CustomSegmentLabelPosition, Transition} from "react-d3-speedometer"
import "./Operations.css"
import {InventoryHealthProps,InventoryItemProps,
    HealthStatus,InventoryItemSummaryProps,ProductDetailProps} from "./types"
import {scaleLinear} from 'd3-scale'
import Collapse from '@mui/material/Collapse';
// import { borderColor, Box } from '@mui/system'
// import * as d3 from "d3"


export const InventoryHealthPanel = ({inventoryItems}: PropsWithChildren<InventoryHealthProps>) =>{
    const [selectedInventoryId, setSelectedInventoryId] = React.useState<string | null>(null);
    const switchSelection = (id:string) => {
        selectedInventoryId == id ? setSelectedInventoryId(null) : setSelectedInventoryId(id)
    }
    return (
        <div >
            <Paper className="expandable" elevation={3} sx={{minHeight: 200, paddingLeft:5, paddingTop:1 }}>
                <div className='inventory-health-panel'>
                {inventoryItems?.map(inventoryItem => 
                    <InventoryItem key={inventoryItem.id} item={inventoryItem} onClick={id=>switchSelection(id)} selected={selectedInventoryId==inventoryItem.id}/>
                    )}
                </div>
                <Collapse in={selectedInventoryId!=null} unmountOnExit timeout={500}>
                    {selectedInventoryId ? <InventoryItemSummary inventoryItemId={selectedInventoryId}/> : <></>} 
                </Collapse>
            </Paper>
        </div>
    )
}

const InventoryItemSummary = ({inventoryItemId}:PropsWithChildren<InventoryItemSummaryProps>) =>{
    const dateRange = 'Jan 1st - Jan 23'
    const totalSales = "$   10,435"
    const salesPerformancePercentageDelta = 9.2
    const grade = 'B-'
    const inStock = '45/340'
    const nextDelivery = 'Feb 18th'
    const willReceive = '200'
    let svg:any
    useEffect(() => {
        drawChart(svg)
    }, [svg]);
    return (
        <div className='inventory-item-summary' style={{minHeight:400}}>
            {/* <h2> Summary</h2>  */}
            <div className='inventory-item-summary-headings'>
                <Paper sx={{
                    width: "48%",
                    height: 150,
                    backgroundColor: 'white',
                    // borderStyle: 'groove',
                    // borderColor: 'green',
                    // borderRadius: 3,
                    '&:hover': {
                        opacity: [0.9, 0.8, 0.7],
                    },
                    
                }}>
                    <h3>Total Sales</h3>
                    <h6>{dateRange}</h6>
                    <h3>{totalSales}</h3>
                    <h6>{salesPerformancePercentageDelta} vs last 6 months</h6>
                    <div className='d3chart'></div>
                </Paper>

                <Paper sx={{
                    width: "45%",
                    height: 150,
                    backgroundColor: 'white',
                    // borderStyle: 'groove',
                    // borderColor: 'green',
                    // borderRadius: 3,
                    '&:hover': {
                        opacity: [0.9, 0.8, 0.7],
                    },
                    display:'flex',
                }}>
                    <div>
                        <h3>{grade}</h3>
                        <h6>Grade</h6>
                    </div>

                    <div>
                        <h3>{inStock}</h3>
                        <h6>In Stock</h6>
                    </div>

                        <div>
                            <h3>{nextDelivery}</h3>
                            <h6>Next Delivery</h6>
                        </div>

                        <div>
                            <h3>{willReceive}</h3>
                            <h6>Will Receive</h6> 
                    </div>
                </Paper>
                </div>
                <ProductDetail sectionId={inventoryItemId}/>
            
        </div>
    )
}

const ProductDetail = ({sectionId}:PropsWithChildren<ProductDetailProps>) =>{
    console.log(sectionId)
    const createData = (sectionId:string) => {
        const rows = []
        if(sectionId=='alcohol')
            rows.push({id:'001', product: "Modelo", onHand:24, lpDate: "Dec 1", lpQty: 18, npQty: 18},
                {id:'002', product: "Coors Light", onHand:30, lpDate: "Dec 1", lpQty: 20, npQty: 10},
                {id:'003', product: "Voodoo Ranger", onHand:8, lpDate: "Dec 1", lpQty: 24, npQty: 30},
                {id:'004', product: "Angel City", onHand:12, lpDate: "Dec 1", lpQty: 12, npQty: 9},
                {id:'005', product: "Penfolds", onHand:24, lpDate: "Dec 12", lpQty: 18, npQty: 18})
        if(sectionId=='soft-drinks')
            rows.push({id:'006', product: "Coca-Cola", onHand:34, lpDate: "Dec 1", lpQty: 12, npQty: 20},
                {id:'007', product: "Red Bull Original", onHand:12, lpDate: "Dec 1", lpQty: 50, npQty: 20},
                {id:'008', product: "Celcius Strawberry", onHand:44, lpDate: "Dec 1", lpQty: 55, npQty: 30},
                {id:'009', product: "Snapple Mango", onHand:42, lpDate: "Dec 1", lpQty: 54, npQty: 45},
                {id:'100', product: "Arizona Tea", onHand:23, lpDate: "Dec 12", lpQty: 32, npQty: 10})
        if(sectionId=='dairy')
        rows.push({id:'101', product: "Tillamook Medium Cheddar Cheese", onHand:24, lpDate: "Dec 1", lpQty: 18, npQty: 18},
                {id:'102', product: "Kerrygold Butter", onHand:30, lpDate: "Dec 1", lpQty: 20, npQty: 10},
                {id:'103', product: "Yoplait Original Yogurt", onHand:8, lpDate: "Dec 1", lpQty: 24, npQty: 30},
                {id:'104', product: "Sargento Shredded Mozzarella Cheese", onHand:12, lpDate: "Dec 1", lpQty: 12, npQty: 9},
                {id:'105', product: "Land O'Lakes Half and Half", onHand:24, lpDate: "Dec 12", lpQty: 18, npQty: 18})
        return rows;
      }

    const rows = createData(sectionId)
    return (
        <div className='inventory-item-product-detail' style={{marginTop:30}}>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead >
                <TableRow >
                    <TableCell sx={{color:"blue", fontWeight:"bold  "}}>Id</TableCell>
                    <TableCell sx={{color:"blue", fontWeight:"bold  "}} align="right">Product</TableCell>
                    <TableCell sx={{color:"blue", fontWeight:"bold  "}} align="right">On Hand</TableCell>
                    <TableCell sx={{color:"blue", fontWeight:"bold  "}} align="right">LP Date</TableCell>
                    <TableCell sx={{color:"blue", fontWeight:"bold  "}} align="right">LP Qty</TableCell>
                    <TableCell sx={{color:"blue", fontWeight:"bold  "}} align="right">NP Qty</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell align="right">{row.product}</TableCell>
                    <TableCell align="right">{row.onHand}</TableCell>
                    <TableCell align="right">{row.lpDate}</TableCell>
                    <TableCell align="right">{row.lpQty}</TableCell>
                    <TableCell align="right">{row.npQty}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}

const InventoryItem = ({item, selected, onClick}: PropsWithChildren<InventoryItemProps>) => {
    const [value,setValue] = React.useState(getValueFromStatus(item?.status))
    // const [data, setData] = useState(null);
    // const [loading, setLoading] = useState(false);
    const colorScale = scaleLinear<string>()
                        .domain([1,25,40,55,80])
                        .range(["red","yellow","green","yellow","red"])
    let colors : any[] = generateColors(colorScale)
    // useEffect(() => {
    //   if (!data) {
    //     setLoading(true);
    //     fetch(`https://backend-service.com/inventory/${item?.name}`)
    //       .then((res) => res.json())
    //       .then((res) => {
    //         setData(res);
    //         setLoading(false);
    //       });
    //   }
    // }, [data, item?.name]);
  
    // if (loading) {
    //   return <div>Loading...</div>;
    // }
    return (
     <Paper elevation={0}
         className={`inventory-item ${selected ? 'inventory-selected':''}`} 
        onClick={()=>onClick(item?.id? item.id : '')}
        sx={{'&:hover': {
            opacity: .9,
            backgroundColor:'#F2F8FD'
            },}}>
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
    </Paper>
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
const drawChart = (svg:any) => {
    console.log("called")
    var margin = {top: 10, right: 30, bottom: 30, left: 60}
    const width = 460 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom;
     
    const data = [12, 5, 6, 6, 9, 10]
    interface ResponseData {
        date:string, value:string
      }
    if(!svg){
        // svg = d3.select(".d3chart")
        // .append("svg")
        // .attr("width", width + margin.left + margin.right)
        // .attr("height", height + margin.top + margin.bottom)
        // .append("g")
        // .attr("transform","translate(" + margin.left + "," + margin.top + ")");
        // d3.csv<ResponseData>("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
        // (d:{date:string, value:string})=>{
        //     return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
        //   },
        //   function(data) {

        //     // Add X axis --> it is a date format
        //     var x = d3.scaleTime()
        //       .domain(d3.extent(data, function(d) { return d.date; }))
        //       .range([ 0, width ]);
        //     svg.append("g")
        //       .attr("transform", "translate(0," + height + ")")
        //       .call(d3.axisBottom(x));
        
        //     // Add Y axis
        //     var y = d3.scaleLinear()
        //       .domain([0, d3.max(data, function(d) { return +d.value; })])
        //       .range([ height, 0 ]);
        //     svg.append("g")
        //       .call(d3.axisLeft(y));
        
        //     // Add the line
        //     svg.append("path")
        //       .datum(data)
        //       .attr("fill", "none")
        //       .attr("stroke", "steelblue")
        //       .attr("stroke-width", 1.5)
        //       .attr("d", d3.line()
        //         .x(function(d) { return x(d.date) })
        //         .y(function(d) { return y(d.value) })
        //         )
        
        // })

    }
   

  }
