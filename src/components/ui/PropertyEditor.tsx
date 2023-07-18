import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { IniFileStoreContext } from "../../data/context/IniFileStoreContext";
import DataGrid from "../shared/data-grid/DataGrid";

function PropertyEditor() {

    const iniFileStore = useContext(IniFileStoreContext);

    return (
        <>
            {
                // Object.values makes sure the observer refreshes on every property
                Object.values(iniFileStore.selectedEntry).length > 0
                ? <DataGrid data={iniFileStore.selectedEntry as any} onValueChange={iniFileStore.setKeyValue}/>
                : <div className="u-parent-centered u-center-text">Select a section from the file to edit</div>
            }
        </>
    )
}

export default observer(PropertyEditor);