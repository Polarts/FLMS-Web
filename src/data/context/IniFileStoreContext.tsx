import { createContext, FC, ReactNode, useMemo } from "react";
import IniFileStore from "../stores/IniFileStore";

export const IniFileStoreContext = createContext<IniFileStore>({} as IniFileStore);

const IniFileStoreProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const iniFileStore = useMemo(() => new IniFileStore(), []);

    return (
        <IniFileStoreContext.Provider value={iniFileStore}>
            {children}
        </IniFileStoreContext.Provider>
    );
}

export default IniFileStoreProvider;