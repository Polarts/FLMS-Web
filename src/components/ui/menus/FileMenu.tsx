import { Menu, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import Icon from '@mdi/react';
import { mdiFolderSearchOutline, mdiExitToApp, mdiFileExcelOutline, mdiContentSaveOutline, mdiContentSaveMoveOutline, mdiContentSaveAllOutline } from '@mdi/js';
import { mdiFileDocumentPlusOutline } from '../../../communityIcons';
import IconMenuItem from "./IconMenuItem";

const tempFileTypes = ["INI File"];
const tempRecentFiles = ["sample.ini", "system.ini", "universe.ini"];

export default function FileMenu() {

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