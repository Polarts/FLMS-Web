import { Menu, SubMenu } from "@szhsin/react-menu";
import { mdiTrayArrowDown, mdiTrayArrowUp } from '@mdi/js';
import IconMenuItem from "./IconMenuItem";
import { useContext, useRef } from "react";
import { LayoutBase } from "rc-dock";
import { AppContext } from "../../../data/context/AppContext";

export default function ViewMenu() {

    const { layout, setLayout } = useContext(AppContext);

    const aRef = useRef<HTMLAnchorElement>(null);
    const filePickerRef = useRef<HTMLInputElement>(null);

    function menuItemClick(item: string) {
        switch(item) {
            case 'saveLayout':
                const layoutJSON = JSON.stringify(layout);
                const file = new Blob([layoutJSON], {type: 'flms-layout'});
                if (!!aRef.current) {
                    const a = aRef.current;
                    a.href = URL.createObjectURL(file);
                    a.download = "FLMS Layout.flms-layout";
                    a.click();
                }
                break;

            case 'loadLayout':
                if (!!filePickerRef.current) {
                    filePickerRef.current!.click();
                }
                break;
        }
    }

    async function layoutFilePicked() {
        if (!!filePickerRef.current) {
            const fileList = filePickerRef.current.files;
            if (!!fileList && fileList.length === 1) {
                const content = await fileList[0].text();
                const layoutData = JSON.parse(content) as LayoutBase;
                setLayout(layoutData);
            }
            filePickerRef.current.value = '';
        }
    }

    return (
        <>
            <a ref={aRef} style={{display: 'none'}}/>
            <input 
                ref={filePickerRef} 
                type="file" 
                style={{display: 'none'}} 
                onChange={layoutFilePicked}
                accept=".flms-layout"
            />
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
        </>
    )
}