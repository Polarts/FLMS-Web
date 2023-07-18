import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { IniFileStoreContext } from "../../../data/context/IniFileStoreContext";
import { IniSectionBase } from "../../../data/ini/interfaces/IniSectionbase";

function EntityList() {

    const iniFileStore = useContext(IniFileStoreContext);

    return (
        <table>
            <thead style={{position: 'sticky', top: 0}}>
                <th>👁</th><th>Name</th><th>#</th><th>Type</th>
            </thead>
            <tbody>
                {
                    iniFileStore.iniObjects.map((obj, i) => {
                        const [type, fields]: [string, unknown] = Object.entries(obj)[0];
                        console.log(fields)
                        return (
                            <tr 
                                onClick={() => iniFileStore.setSelectedEntryIndex(i)}
                                style={{ background: iniFileStore.selectedEntryIndex === i? 'aqua' : 'none' }}
                            >
                                <td>👁</td>
                                <td>{(fields as IniSectionBase).nickname ?? type}</td>
                                <td>{i+1}</td>
                                <td>{type}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default observer(EntityList);