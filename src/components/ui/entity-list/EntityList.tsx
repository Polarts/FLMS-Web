import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { IniFileStoreContext } from "../../../data/context/IniFileStoreContext";
import { IniSectionEntityBase } from "../../../data/ini/models/IniSectionEntityBase";
import { Dict } from "../../../utils/types";
import SortableTable from "../../shared/sortable-table/SortableTable";
import { ColumnDefinition } from "../../shared/sortable-table/SortableTable.interfaces";

const colDefs: Dict<ColumnDefinition<IniSectionEntityBase>> = {
    isVisible: {
        title: "👁",
        cellRenderer: () => "👁",
        compareFn: () => 0
    },
    name: {
        title: "Name",
        compareFn: (a, b) => a.nickname.localeCompare(b.nickname)
    },
    index: {
        title: "#",
        compareFn: (a, b) => a.index - b.index
    },
    type: {
        title: "Type",
        compareFn: (a, b) => a.type.localeCompare(b.type)
    }
};

function EntityList() {

    const iniFileStore = useContext(IniFileStoreContext);

    return (
        <SortableTable colDefs={colDefs} rows={iniFileStore.iniEntities} onSelect={(row) => iniFileStore.setSelectedEntity(row)}/>
    )
}

export default observer(EntityList);