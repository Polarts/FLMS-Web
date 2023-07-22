import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { IniFileStoreContext } from "../../data/context/IniFileStoreContext";
import DataGrid from "../shared/data-grid/DataGrid";

function PropertyEditor() {

    const iniFileStore = useContext(IniFileStoreContext);

    return (
        <>
            {
                iniFileStore.selectedEntity
                ? <DataGrid data={iniFileStore.selectedEntity.objectForEditor} onValueChange={iniFileStore.selectedEntity.setKeyValue}/>
                : <div className="u-parent-centered u-center-text">Select a section from the file to edit</div>
            }
        </>
    )
}

export default observer(PropertyEditor);