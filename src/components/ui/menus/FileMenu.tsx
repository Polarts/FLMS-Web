import { Menu, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import Icon from '@mdi/react';
import { mdiFolderSearchOutline } from '@mdi/js';

const tempFileTypes = ["ini file"];
const tempRecentFiles = ["sample.ini", "system.ini", "universe.ini"];

export default function FileMenu() {
    return (
        <Menu 
            menuButton={<button>File</button>}
            onItemClick={e => console.log}
        >
            <SubMenu label="New">
                {tempFileTypes.map(type => (
                    <MenuItem key={type+"-menu-item"}>{type}</MenuItem>
                ))}
            </SubMenu>
            <SubMenu label="Open">
                <MenuItem>
                    <Icon 
                        path={mdiFolderSearchOutline}
                        size={0.8}
                    />
                    <span style={{marginLeft: '5px'}}>Browse...</span>
                </MenuItem>
                <MenuDivider/>
                {tempRecentFiles.map(file => (
                    <MenuItem key={file+"-menu-item"}>{file}</MenuItem>
                ))}
            </SubMenu>
        </Menu>
    )
}