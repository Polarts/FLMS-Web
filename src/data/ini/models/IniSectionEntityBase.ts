import { IIniObject } from "js-ini";
import { makeAutoObservable } from "mobx";
import { Dict } from "../../../utils/types";
import { IniSectionBase } from "../interfaces/IniSectionbase";

export class IniSectionEntityBase implements IniSectionBase {
    constructor(
        public nickname: string,
        public type: string,
        public isVisible: boolean,
        public index: number,
    ) {
        makeAutoObservable(this);
    }

    public static fromIniObject(iniObj: IIniObject, index: number): IniSectionEntityBase {
        const [type, fields]: [string, unknown] = Object.entries(iniObj)[0];
        const nickname = (fields as Dict<string>)["nickname"];
        const entity = new IniSectionEntityBase(nickname ?? type, nickname? type : "General", true, index);
        return entity;
    }
}