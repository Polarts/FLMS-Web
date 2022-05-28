import { Menu, MenuItem, SubMenu } from "@szhsin/react-menu";
import { mdiDownloadOutline, mdiTrayArrowDown, mdiTrayArrowUp, mdiUploadOutline } from '@mdi/js';
import Icon from "@mdi/react";

export default function ViewMenu() {

    return (
        <Menu
            menuButton={
                <button className={`menu-button`}>
                    View
                </button>
            }
        >
            <SubMenu label="Layout">
                <MenuItem>
                    <Icon 
                        path={mdiTrayArrowUp}
                        size={0.8}
                    />
                    <span>Save to file</span>
                </MenuItem>
                <MenuItem>
                    <Icon
                        path={mdiTrayArrowDown}
                        size={0.8}
                    />
                    <span>Load from file</span>
                </MenuItem>
            </SubMenu>
        </Menu>
    )
}