import { IIniObject, IIniObjectSection, IniValue } from "js-ini";
import { makeObservable, makeAutoObservable, observable, action, computed, runInAction } from "mobx";
import BiniDataView from "../ini/BiniDataView";
import { parseFromString } from "../ini/IniParser";

const fr = new FileReader();

function iniObjectToObservable(iniObj: IIniObject) {
    return makeAutoObservable(iniObj);
}

export default class IniFileStore {

    private file?: Blob;

    public iniObjects: IIniObject[] = [];

    public selectedEntryIndex = 0;
    public setSelectedEntryIndex(value: number) {
        this.selectedEntryIndex = value;
    }

    public get selectedEntry(): IIniObjectSection {
        const selectedObject = this.iniObjects?.at(this.selectedEntryIndex);
        if (selectedObject) {
            const section = Object.values(selectedObject)[0] as IIniObjectSection;
            return section;
        }
        return {};
    }

    public setKeyValue(key: string, value: IniValue) {
        this.selectedEntry[key] = value;
    }

    constructor() {
        this.setKeyValue = this.setKeyValue.bind(this);
        this.readFile = this.readFile.bind(this);
        this.handleTextFileLoad = this.handleTextFileLoad.bind(this);
        this.handleBinaryFileLoad = this.handleBinaryFileLoad.bind(this);

        makeObservable(this, {
            iniObjects: observable,
            selectedEntryIndex: observable,
            setSelectedEntryIndex: action,
            selectedEntry: computed,
            setKeyValue: action
        });
    }

    public readFile(file: Blob) {
        this.file = file;
        // Default is trst to check if it was bini in first place.
        fr.onload = this.handleTextFileLoad;
        fr.readAsText(file);
    }

    private handleTextFileLoad(e: ProgressEvent<FileReader>) {
        const result = e.target?.result;
        const str = result as string;
        const isBini = str.startsWith("BINI"); // Bini files always start with the magic word "BINI"
        if (isBini) {
            // No way around it, need to 
            fr.onload = this.handleBinaryFileLoad;
            fr.readAsArrayBuffer(this.file!);
        } else {
            const parsed = parseFromString(str);
            runInAction(() => {
                this.iniObjects = parsed.map(iniObjectToObservable);
            })
        }
    }

    private handleBinaryFileLoad(e: ProgressEvent<FileReader>) {
        const result = e.target?.result;
        const buf = result as ArrayBuffer;
        const bini = new BiniDataView(new Uint8Array(buf));
        const biniResult = bini.readBiniFile(buf.byteLength);
        // TODO handle bini result
    }
}