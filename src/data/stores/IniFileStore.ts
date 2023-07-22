import { IIniObject, IIniObjectSection, IniValue } from "js-ini";
import { makeObservable, makeAutoObservable, observable, action, computed, runInAction } from "mobx";
import BiniDataView from "../ini/BiniDataView";
import { parseFromString } from "../ini/IniParser";
import { IniSectionEntityBase } from "../ini/models/IniSectionEntityBase";

const fr = new FileReader();

export default class IniFileStore {

    private file?: Blob;

    public iniEntities: IniSectionEntityBase[] = [];

    public selectedEntity?: IniSectionEntityBase;
    public setSelectedEntity(entity?: IniSectionEntityBase) {
        this.selectedEntity = entity;
    }

    constructor() {
        this.readFile = this.readFile.bind(this);
        this.handleTextFileLoad = this.handleTextFileLoad.bind(this);
        this.handleBinaryFileLoad = this.handleBinaryFileLoad.bind(this);

        makeObservable(this, {
            iniEntities: observable,
            selectedEntity: observable,
            setSelectedEntity: action,
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
                this.iniEntities = parsed.map(IniSectionEntityBase.fromIniObject);
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