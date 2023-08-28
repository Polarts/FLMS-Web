import { observer } from "mobx-react-lite";
import { useContext, useMemo } from "react";
import { IniFileStoreContext } from "../../data/context/IniFileStoreContext";
import * as templates from "../../data/ini/templates.json";
import { Dict } from "../../utils/types";
import DataGrid from "../shared/data-grid/DataGrid";


function PropertyEditor() {

    const iniFileStore = useContext(IniFileStoreContext);
    const [selectedEntryKey, selectedEntryValue] = Object.entries(iniFileStore.selectedIniObj)?.at(0) ?? [];
    // Object.entries makes sure the observer refreshes on every property
    const selectedEntryValueEntries = Object.entries(selectedEntryValue ?? {});

    const template = useMemo(() => {
        if (iniFileStore.selectedIniObj && selectedEntryKey) {
            const template = (templates as Dict<Dict<string>>)[selectedEntryKey];
            Object.assign(template, selectedEntryValue)
            return template;
        }
        return {};
    }, [iniFileStore.selectedIniObjIdx, selectedEntryValueEntries])

    return (
        <>
            {
                selectedEntryValueEntries.length > 0
                    ? <DataGrid data={template as any} onValueChange={iniFileStore.setKeyValue} />
                    : <div className="u-parent-centered u-center-text">Select a section from the file to edit</div>
            }
        </>
    )
}

export default observer(PropertyEditor);