import { mdiContentSaveAllOutline, mdiContentSaveMoveOutline, mdiContentSaveOutline, mdiExitToApp, mdiFileExcelOutline, mdiFolderSearchOutline } from '@mdi/js';
import { Menu, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import { useContext } from "react";
import { mdiFileDocumentPlusOutline } from '../../../communityIcons';
import { IniFileStoreContext } from '../../../data/context/IniFileStoreContext';
import { FilePickerContext } from "../../../data/context/FilePickerContext";
import IconMenuItem from "./IconMenuItem";

const tempFileTypes = ["INI File"];
const tempRecentFiles = ["sample.ini", "system.ini", "universe.ini"];

export default function FileMenu() {

    const { pickFile, saveFile } = useContext(FilePickerContext);

    const iniFileStore = useContext(IniFileStoreContext);

    function browse() {
        pickFile(async (fileList) => {
            if (!!fileList && fileList.length === 1) {
                iniFileStore.readFile(fileList[0]);
            }
        }, ".ini");
    }

    function save() {
        iniFileStore.toString();
    }

    return (
        <Menu 
            menuButton={
                <button className={`menu-button`}>
                    File
                </button>
            }
        >
            <SubMenu label="New">
                {tempFileTypes.map(type => (
                    <IconMenuItem 
                        key={type+"-menu-item"}
                        icon={mdiFileDocumentPlusOutline}
                        label={type}
                    />
                ))}
            </SubMenu>
            <SubMenu label="Open">
                <IconMenuItem
                    icon={mdiFolderSearchOutline}
                    label="Browse..."
                    onClick={browse}
                />
                <MenuDivider/>
                {tempRecentFiles.map(file => (
                    <MenuItem key={file+"-menu-item"}>{file}</MenuItem>
                ))}
            </SubMenu>
            <IconMenuItem
                icon={mdiFileExcelOutline}
                label="Close file"
            />
            <MenuDivider/>
            <IconMenuItem
                icon={mdiContentSaveOutline}
                label="Save"
                onClick={save}
            />
            <IconMenuItem
                icon={mdiContentSaveMoveOutline}
                label="Save as"
            />
            <IconMenuItem
                icon={mdiContentSaveAllOutline}
                label="Save all"
            />
            <MenuDivider/>
            <IconMenuItem
                icon={mdiExitToApp}
                label="Exit app"
            />
        </Menu>
    )
}