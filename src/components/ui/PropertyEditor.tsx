import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { IniFileStoreContext } from "../../data/context/IniFileStoreContext";
import DataGrid from "../shared/data-grid/DataGrid";

function PropertyEditor() {

    const { selectedEntity } = useContext(IniFileStoreContext);

    useEffect(() => {
        console.log(selectedEntity);
        
    }, [selectedEntity])

    return (
        <>
            {
                selectedEntity
                ? <DataGrid data={selectedEntity.objectForEditor} onValueChange={selectedEntity.setKeyValue}/>
                : <div className="u-parent-centered u-center-text">Select a section from the file to edit</div>
            }
        </>
    )
}

export default observer(PropertyEditor);