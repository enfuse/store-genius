import { MpSdk } from '@matterport/webcomponent/built-bundle/sdk'
import React, { ReactNode } from 'react'

interface Props {
    children?: ReactNode
}

export interface MatterportSdkProps {
    setSdk: (newSdk: MpSdk) => void;
    sdk: MpSdk | null;
}

export const MatterportContext = React.createContext<MatterportSdkProps>({setSdk: (newSdk: MpSdk) => {}, sdk: null})

export const MatterportContextProvider = ({children}: Props) => {
    const [sdk, dispatchSdk] = React.useState<MpSdk| null>(null)

    const setSdk = React.useCallback((newSdk: MpSdk) => dispatchSdk(newSdk), [sdk])

    return <MatterportContext.Provider
        value = {{
            setSdk,
            sdk
        }}>
        {children}
    </MatterportContext.Provider>
}