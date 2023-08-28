import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { IniFileStoreContext } from "../../data/context/IniFileStoreContext";

function FileEntityList() {

    const iniFileStore = useContext(IniFileStoreContext);

    return (
        <>
            {
                iniFileStore.iniObjects.map((obj, i) => {
                    const entries = Object.entries(obj);
                    return <div onClick={() => iniFileStore.setSelectedIniObjIdx(i)} style={{color: iniFileStore.selectedIniObjIdx === i? 'red' : 'black'}}>{`${entries[0][0]}`}</div>
                })
            }
        </>
    )
}

export default observer(FileEntityList);