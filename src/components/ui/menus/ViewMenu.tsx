import { Menu, MenuItem, SubMenu } from "@szhsin/react-menu";
import { mdiDownloadOutline, mdiUploadOutline } from '@mdi/js';
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
                        path={mdiDownloadOutline}
                        size={0.8}
                    />
                    <span>Save to file</span>
                </MenuItem>
                <MenuItem>
                    <Icon
                        path={mdiUploadOutline}
                        size={0.8}
                    />
                    <span>Load from file</span>
                </MenuItem>
            </SubMenu>
        </Menu>
    )
}