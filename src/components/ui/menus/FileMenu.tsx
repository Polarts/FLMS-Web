import { Menu, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import Icon from '@mdi/react';
import { mdiFolderSearchOutline } from '@mdi/js';
import { mdiFileDocumentPlusOutline } from '../../../communityIcons';
import { useState } from "react";

const tempFileTypes = ["INI File"];
const tempRecentFiles = ["sample.ini", "system.ini", "universe.ini"];

export default function FileMenu() {

    const [isOpen, setOpen] = useState(false);

    return (
        <Menu 
            menuButton={
                <button className={`menu-button${isOpen? " open" : ""}`}
                        onClick={() => setOpen(prev => !prev)}>
                    File
                </button>
            }
            onItemClick={() => setOpen(false)}
        >
            <SubMenu label="New">
                {tempFileTypes.map(type => (
                    <MenuItem key={type+"-menu-item"}>
                        <Icon 
                            path={mdiFileDocumentPlusOutline}
                            size={0.8}
                        />
                        <span>{type}</span>
                    </MenuItem>
                ))}
            </SubMenu>
            <SubMenu label="Open">
                <MenuItem>
                    <Icon 
                        path={mdiFolderSearchOutline}
                        size={0.8}
                    />
                    <span>Browse...</span>
                </MenuItem>
                <MenuDivider/>
                {tempRecentFiles.map(file => (
                    <MenuItem key={file+"-menu-item"}>{file}</MenuItem>
                ))}
            </SubMenu>
        </Menu>
    )
}