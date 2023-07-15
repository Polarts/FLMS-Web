import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { IniFileStoreContext } from "../../data/context/IniFileStoreContext";
import DataGrid from "../shared/data-grid/DataGrid";

function PropertyEditor() {

    const iniFileStore = useContext(IniFileStoreContext);

    // Hack to make the observer refresh
    Object.values(iniFileStore.selectedEntry)

    return (
        <DataGrid data={iniFileStore.selectedEntry as any} onValueChange={iniFileStore.setKeyValue}/>
    )
}

export default observer(PropertyEditor);