import { MatterportContextProvider } from './MatterportContextProvider'
import { MatterportFrame } from './MatterportFrame'

export const MatterportDemo = () =>{
    return (
        <div className='matterport-demo'>
            <MatterportContextProvider>
               <MatterportFrame />
            </MatterportContextProvider>
        </div>
    )
}