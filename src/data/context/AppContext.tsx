import { LayoutBase } from "rc-dock";
import React, { createContext, FC, ReactNode, useEffect, useState } from "react";

export interface AppContextState {
    layout?: LayoutBase,
    setLayout: (l: LayoutBase) => void
}

export const AppContext = createContext<AppContextState>({
    setLayout: () => {}
});

const AppProvider: FC<{children: ReactNode}> = ({ children }) => {
    
    const [layout, setLayout] = useState<LayoutBase|undefined>();

    // init
    useEffect(() => {
        const layoutJson = localStorage.getItem('layout');
        if (!!layoutJson && layoutJson !== '{}' && layoutJson !== '') {
            setLayout(JSON.parse(layoutJson));
        }
    }, []);

    // layout reaction
    useEffect(() => {
        if (!!layout) {
            const layoutJson = JSON.stringify(layout);
            localStorage.setItem('layout', layoutJson);
        }
    }, [layout]);

    return (
        <AppContext.Provider value={{
            layout,
            setLayout
        }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;