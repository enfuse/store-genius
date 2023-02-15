import showcaseUrl from '../../bundle/showcase.html?url'
import { MpSdk, Pointer, Vector3 } from '@matterport/webcomponent'
import * as React from 'react'

import './Matterport.css'
import '@matterport/webcomponent'
import { MatterportContext } from './MatterportContextProvider'

const API_KEY = import.meta.env.VITE_REACT_APP_MATTERPORT_API_KEY
const MODEL_ID = '9bVW1AtJSnp'
const src = `${showcaseUrl}?m=${MODEL_ID}&play=1&qs=1&log=0&applicationKey=${API_KEY}`

declare global {
    interface Window {
        MP_SDK: any;
    }
}

export function MatterportFrame() {

    const { setSdk, sdk } = React.useContext(MatterportContext)

    let pointerPosition: Vector3 = { x: 0, y: 0, z: 0 }

    React.useEffect(() => {

        const showcase = document.getElementById('showcase') as HTMLIFrameElement;
        // const viewer = document.querySelector<MatterportViewer>('matterport-viewer')! as MatterportViewer;
        const currentPositionEl = document.getElementById('mp-position') as HTMLElement;
        console.log("use effect");
        let sdk: MpSdk

        showcase.addEventListener('load', async function () {
            try {
                sdk = await showcase!.contentWindow!.MP_SDK.connect(showcase, API_KEY, '3.10');
            } catch (e) {
                console.error(e);
                return;
            }

            setSdk(sdk)

            await sdk.Scene.configure((renderer: any, three: any) => {
                renderer.outputEncoding = three.sRGBEncoding;
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.bias = 0.0001;
                renderer.shadowMap.type = three.PCFSoftShadowMap;
            })

            function cacheCoords(intersectionData: Pointer.Intersection) {
                pointerPosition = intersectionData.position
                currentPositionEl.innerHTML = `Cursor position: ${pointToString(pointerPosition)}`;
            }

            sdk.Pointer.intersection.subscribe(cacheCoords);

            console.log("handle load")

            showcase!.contentWindow!.document.body.addEventListener('contextmenu', () => console.log(pointToString(pointerPosition)));
        })
    }, []);

    return (
        <div className="matterport-container">
            <iframe id="showcase"
                className="matterport-frame"
                src={src}
                width="1024"
                height="768"
                allow="xr-spatial-tracking"
            ></iframe>
            <div id="mp-position"></div>
        </div>
    )
}

function pointToString(point: any) {
    var x = point.x.toFixed(3);
    var y = point.y.toFixed(3);
    var z = point.z.toFixed(3);

    return `{ x: ${x}, y: ${y}, z: ${z} }`;
}