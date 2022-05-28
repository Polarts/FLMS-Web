import { Menu, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import { mdiFolderSearchOutline, mdiExitToApp, mdiFileExcelOutline, mdiContentSaveOutline, mdiContentSaveMoveOutline, mdiContentSaveAllOutline } from '@mdi/js';
import { mdiFileDocumentPlusOutline } from '../../../communityIcons';
import IconMenuItem from "./IconMenuItem";
import { useContext } from "react";
import { FileContext } from "../../../data/context/FileContext";
import jDataView from "jdataview";

const tempFileTypes = ["INI File"];
const tempRecentFiles = ["sample.ini", "system.ini", "universe.ini"];

export default function FileMenu() {

    const { pickFile, saveFile } = useContext(FileContext);

    function browse() {
        pickFile(async (fileList) => {
            if (!!fileList && fileList.length === 1) {
                const fr = new FileReader();
                fr.readAsArrayBuffer(fileList[0]);
                fr.onload = (e) => {
                    const buffer = e.target?.result as ArrayBuffer;
                    console.log(buffer);
                    const bytes = new Uint8Array(buffer);
                    const jdv = new jDataView(bytes);
                    const fileTag = jdv.getString(4);
                    console.log('file tag:', fileTag, 'position:', jdv.tell());
                    const version = jdv.getInt8();
                    console.log('version:', version, 'position:', jdv.tell());
                    const stringBlockOffset = jdv.getInt32();
                    console.log(
                        'string block offset:', stringBlockOffset, 
                        'length:', bytes.byteLength, 
                        'position:', jdv.tell()
                    );
                    //jdv.seek(stringBlockOffset);
                    //const strBlock = jdv.getString(bytes.byteLength - stringBlockOffset, stringBlockOffset);
                    //console.log(strBlock);
                    const entryNameOffset = jdv.getInt16();
                    console.log('entry name offset:', entryNameOffset, 'position:', jdv.tell());
                    const sectionEntriesCount = jdv.getInt16();
                    console.log('section entries count:', sectionEntriesCount, 'position:', jdv.tell());
                    
                }
            }
        }, ".ini");
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