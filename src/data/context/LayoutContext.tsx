import { LayoutBase } from "rc-dock";
import { createContext, FC, ReactNode, useEffect, useState } from "react";

export interface LayoutContextState {
    layout?: LayoutBase,
    setLayout: (l: LayoutBase) => void
}

export const LayoutContext = createContext<LayoutContextState>({
    setLayout: () => { }
});

const LayoutProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [layout, setLayout] = useState<LayoutBase | undefined>();

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
        <LayoutContext.Provider value={{
            layout,
            setLayout
        }}>
            {children}
        </LayoutContext.Provider>
    );
}

export default LayoutProvider;