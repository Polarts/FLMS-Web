import { IIniObject, IniValue } from "js-ini";
import { action, computed, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { Dict } from "../../utils/types";
import BiniDataView from "../ini/BiniDataView";
import { parseFromString } from "../ini/IniParser";
import { IniComment } from "../ini/types";

const fr = new FileReader();

function iniObjectToObservable(iniObj: IIniObject) {
    return makeAutoObservable(iniObj);
}

export default class IniFileStore {

    private file?: Blob;
    private lines: string[] = [];
    private comments: IniComment[] = [];

    public iniObjects: IIniObject[] = [];

    public selectedIniObjIdx = 0;
    public setSelectedIniObjIdx(value: number) {
        this.selectedIniObjIdx = value;
    }

    public get selectedIniObj(): IIniObject {
        return this.iniObjects.at(this.selectedIniObjIdx) ?? {};
    }

    public setKeyValue(key: string, value: IniValue) {
        const obj = Object.values(this.selectedIniObj)[0] as Dict<IniValue>;
        obj[key] = value;
        console.log(obj);
    }

    constructor() {
        this.setKeyValue = this.setKeyValue.bind(this);
        this.readFile = this.readFile.bind(this);
        this.handleTextFileLoad = this.handleTextFileLoad.bind(this);
        this.handleBinaryFileLoad = this.handleBinaryFileLoad.bind(this);

        makeObservable(this, {
            iniObjects: observable,
            selectedIniObjIdx: observable,
            setSelectedIniObjIdx: action,
            selectedIniObj: computed,
            setKeyValue: action
        });
    }

    public readFile(file: Blob) {
        this.file = file;
        // Default is text to check if it was bini in first place.
        fr.onload = this.handleTextFileLoad;
        fr.readAsText(file);
    }

    private handleTextFileLoad(e: ProgressEvent<FileReader>) {
        const result = e.target?.result;
        const str = result as string;
        const isBini = str.startsWith("BINI"); // Bini files always start with the magic word "BINI"
        if (isBini) {
            // No way around it, need to reload the file
            fr.onload = this.handleBinaryFileLoad;
            fr.readAsArrayBuffer(this.file!);
        } else {
            this.lines = str.split("\n");
            this.lines.forEach((line, index) => {
                const position = line.indexOf(";");
                if (position !== -1) {
                    this.comments.push({
                        content: line,
                        lineNum: index,
                        position
                    })
                }
            })
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