import { IIniObject } from "js-ini";
import { action, computed, makeAutoObservable } from "mobx";
import { Dict } from "../../../utils/types";

const omitKeysForEdit = [
    "name",
    "type",
    "isVisible",
    "index",
    "setDynamicProperties",
    "setKeyValue",
    "objectForEditor"
]

export class IniSectionEntityBase {

    // Additional dynamic properties
    [key:string]: any;

    constructor(
        public name: string,
        public type: string,
        public isVisible: boolean,
        public index: number,
    ) {
        this.setKeyValue = this.setKeyValue.bind(this);
        makeAutoObservable(this, {
            setDynamicProperties: action,
            setKeyValue: action,
            objectForEditor: computed
        });
    }

    public setDynamicProperties(properties: Dict<string>) {
        Object.assign(this, properties);
    }

    public setKeyValue(key: string, value: string) {
        this[key] = value;
    }

    public get objectForEditor(): Dict<string> {
        return Object.fromEntries(Object.entries(this).filter(([key]) => !omitKeysForEdit.includes(key)))
    }

    public static fromIniObject(iniObj: IIniObject, index: number): IniSectionEntityBase {
        const [type, fields]: [string, unknown] = Object.entries(iniObj)[0];
        const properties = fields as Dict<string>
        const nickname = properties["nickname"];
        const entity = new IniSectionEntityBase(nickname ?? type, nickname? type : "General", true, index);
        entity.setDynamicProperties(properties);
        return entity;
    }
}