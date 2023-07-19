import { IIniObjectSection } from "js-ini";
import { observer } from "mobx-react-lite";
import { useContext, useMemo } from "react";
import { IniFileStoreContext } from "../../../data/context/IniFileStoreContext";
import { IniSectionBase } from "../../../data/ini/interfaces/IniSectionbase";
import { IniSectionEntityBase } from "../../../data/ini/models/IniSectionEntityBase";
import { Dict } from "../../../utils/types";
import SortableTable from "../../shared/sortable-table/SortableTable";
import { ColumnDefinition } from "../../shared/sortable-table/SortableTable.interfaces";

const colDefs: Dict<ColumnDefinition<IniSectionEntityBase>> = {
    isVisible: {
        title: "👁",
        cellRenderer: () => "👁",
        compareFn: (a, b) => 0
    },
    nickname: {
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
        <SortableTable colDefs={colDefs} rows={iniFileStore.iniEntities} onSelect={(_, i) => iniFileStore.setSelectedEntryIndex(i)}/>
        // <table>
        //     <thead style={{position: 'sticky', top: 0}}>
        //         <th>👁</th><th>Name</th><th>#</th><th>Type</th>
        //     </thead>
        //     <tbody>
        //         {
        //             iniFileStore.iniObjects.map((obj, i) => {
        //                 const [type, fields]: [string, unknown] = Object.entries(obj)[0];
        //                 console.log(fields)
        //                 return (
        //                     <tr 
        //                         onClick={() => iniFileStore.setSelectedEntryIndex(i)}
        //                         style={{ background: iniFileStore.selectedEntryIndex === i? 'aqua' : 'none' }}
        //                     >
        //                         <td>👁</td>
        //                         <td>{(fields as IniSectionBase).nickname ?? type}</td>
        //                         <td>{i+1}</td>
        //                         <td>{type}</td>
        //                     </tr>
        //                 )
        //             })
        //         }
        //     </tbody>
        // </table>
    )
}

export default observer(EntityList);