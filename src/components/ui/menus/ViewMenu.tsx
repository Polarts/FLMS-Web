import { Menu, SubMenu } from "@szhsin/react-menu";
import { mdiTrayArrowDown, mdiTrayArrowUp } from '@mdi/js';
import IconMenuItem from "./IconMenuItem";
import { useContext, useRef } from "react";
import { LayoutBase } from "rc-dock";
import { LayoutContext } from "../../../data/context/LayoutContext";
import { FilePickerContext } from "../../../data/context/FilePickerContext";

export default function ViewMenu() {

    const { pickFile, saveFile } = useContext(FilePickerContext);
    const { layout, setLayout } = useContext(LayoutContext);
    
    function menuItemClick(item: string) {
        switch(item) {
            case 'saveLayout':
                const layoutJSON = JSON.stringify(layout);
                const file = new Blob([layoutJSON], {type: 'flms-layout'});
                saveFile(file, "FLMS Layout.flms-layout");
                break;

            case 'loadLayout':
                pickFile(async (fileList) => {
                    if (!!fileList && fileList.length === 1) {
                        const content = await fileList[0].text();
                        const layoutData = JSON.parse(content) as LayoutBase;
                        setLayout(layoutData);
                    }
                }, ".flms-layout");
                break;
        }
    }

    return (
        <Menu
            menuButton={
                <button className={`menu-button`}>
                    View
                </button>
            }
        >
            <SubMenu label="Layout">
                <IconMenuItem 
                    onClick={() => menuItemClick('saveLayout')}
                    icon={mdiTrayArrowDown}
                    label="Save to file"
                />
                <IconMenuItem 
                    onClick={() => menuItemClick('loadLayout')}
                    icon={mdiTrayArrowUp}
                    label="Load from file"
                />
            </SubMenu>
        </Menu>
    )
}