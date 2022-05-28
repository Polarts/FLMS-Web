import { Menu, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import Icon from '@mdi/react';
import { mdiFolderSearchOutline, mdiExitToApp } from '@mdi/js';
import { mdiFileDocumentPlusOutline } from '../../../communityIcons';
import { useState } from "react";

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
            <MenuItem>Close</MenuItem>
            <MenuDivider/>
            <MenuItem>Save</MenuItem>
            <MenuItem>Save As</MenuItem>
            <MenuItem>Save All</MenuItem>
            <MenuDivider/>
            <MenuItem>
                <Icon
                    path={mdiExitToApp}
                    size={0.8}
                />
                <span>Exit</span>
            </MenuItem>
        </Menu>
    )
}