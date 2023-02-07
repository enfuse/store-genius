import type {MpSdk,Vector3, Pointer, IObservable} from '@matterport/webcomponent'
import showcaseUrl from '../../bundle/showcase.html?url'
type Vertex<T> = MpSdk.Graph.Vertex<T>
type ObservableSweepData = MpSdk.Sweep.ObservableSweepData
type IDirectedGraph<T> = MpSdk.Graph.IDirectedGraph<T>
import {useEffect} from "react";
import * as React from 'react'
declare global {
    interface Window {
        MP_SDK: any;
    }
}

export function Matterport(props:any) {
    const SHOW_CURRENT_POSITION = false;
    const API_KEY = import.meta.env.VITE_REACT_APP_MATTERPORT_API_KEY

    useEffect(() => {
        window.process = {
          ...window.process,
        };
      }, []);

    useEffect(() => {
        const showcase = document.getElementById('showcase') as HTMLIFrameElement;
        const currentPositionEl = document.getElementById('position') as HTMLElement;
        showcase.addEventListener('load', async function () {
            let sdk:MpSdk;
            let result;
            try {
                sdk = await showcase!.contentWindow!.MP_SDK.connect(showcase, API_KEY, '3.10');
                const sweepGraph = await sdk.Sweep.createGraph()
                const sweepVertices = getSweepVertices(sweepGraph)
                const TARGET_VECTOR: Vector3 = props.position
                const closestSweep = getClosestSweep(TARGET_VECTOR, sweepVertices) as Vertex<ObservableSweepData>
                const startSweep = sweepGraph.vertex('3cac7cd82fb24055997bd43d980504ef') as Vertex<ObservableSweepData>;
                const aStarRunner = sdk.Graph.createAStarRunner(sweepGraph, startSweep, closestSweep!);
                result = aStarRunner.exec();

                if (result.status === sdk.Graph.AStarStatus.SUCCESS) {
                    // console.log('found a path of length', result.path.length);
                    const pathTags = []
                    pathTags.push({
                        label: props.name,
                        anchorPosition: props.position,
                        stemVector: {x: 0, y: 0, z: 0},
                        color: {r: 0/255, g: 128/255, b: 0/255}
                    })
                    await sdk.Mattertag.add(pathTags);
                    await stepToTargetDestination(sdk, result.path)
                }
            } catch (e) {
                console.error(e);
                return;
            }
            await sdk.Scene.configure((renderer: any, three: any) => {
                renderer.outputEncoding = three.sRGBEncoding;
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.bias = 0.0001;
                renderer.shadowMap.type = three.PCFSoftShadowMap;
            })

            function printCoords(intersectionData: Pointer.Intersection) {
                currentPositionEl.innerHTML = `Cursor position: ${pointToString(intersectionData.position)}`;
            }
            if (SHOW_CURRENT_POSITION) {
                sdk.Pointer.intersection.subscribe(printCoords);
            }
        });
    }, []);

    console.log(API_KEY)
    return (<>
        <div id="position"></div>
        <iframe id="showcase" src={showcaseUrl + "?m=9bVW1AtJSnp&play=1&qs=1&log=0&applicationKey=" + API_KEY} width="680px" height="510px" frameBorder="0" allow="xr-spatial-tracking" allowFullScreen/>
    </>)
}

function getSweepVertices(sweepGraph: IDirectedGraph<ObservableSweepData>) {
    const sweepVertices: Vertex<ObservableSweepData>[] = []
    for (const vertex of sweepGraph.vertices) {
        sweepVertices.push(vertex)
    }
    return sweepVertices
}


function distance3D(positionA: Vector3, positionB: Vector3) {
    const dX = positionA.x - positionB.x;
    const dY = positionA.y - positionB.y;
    const dZ = positionA.z - positionB.z;
    return Math.sqrt((dX * dX) + (dY * dY) + (dZ * dZ));
}

function getClosestSweep(source: Vector3, sweepVertices: Vertex<ObservableSweepData>[]) : Vertex<ObservableSweepData> |null  {
    let closestDistance: number | undefined = undefined
    let closestSweep : Vertex<ObservableSweepData> | null =null
    sweepVertices.forEach(sweep => {
        const distance = distance3D(source, sweep.data.position)
        if (closestDistance == undefined || distance < closestDistance) {
            closestDistance = distance
            closestSweep = sweep
        }
    })
    return closestSweep
}

async function stepToTargetDestination(sdk: any, path: any, idx = 0) {
    const rotation = {x: 0, y: 0};
    const transition = sdk.Sweep.Transition.FLY;
    const transitionTime = 2000;

    //wait for inside mode to load completely
    await sdk.Mode.transition.waitUntil(function (transition: any) {
        return transition.from == null && transition.to == null
    });
    sdk.Sweep.moveTo(path[idx].id, {
        rotation: rotation,
        transition: transition,
        transitionTime: transitionTime,
    })
        .then(async function (sweepId: string) {
            // console.log('Arrived at sweep ' + sweepId);
            await new Promise(r => setTimeout(r, 500));
            if (idx < path.length - 1) await stepToTargetDestination(sdk, path, ++idx)
        })
        .catch(function (e: any) {
            console.log(e)
        });
}

function pointToString(point:any) {
    var x = point.x.toFixed(3);
    var y = point.y.toFixed(3);
    var z = point.z.toFixed(3);

    return `{ x: ${x}, y: ${y}, z: ${z} }`;
}