import { MatterportContextProvider } from './MatterportContextProvider'
import { MatterportFrame } from './MatterportFrame'

export const MatterportDemo = () =>{
    return (
        <div className='materport-demo'>
            <MatterportContextProvider>
               <MatterportFrame />
            </MatterportContextProvider>
        </div>
    )
}