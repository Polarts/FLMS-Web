import { parse, IIniObject, IniValue } from "js-ini";
import { Dict } from "../../utils/types";


export function parseFromString(iniText: string) {
    const iniObjects: IIniObject[] = [];
    iniText.split(/(^\[)/gm).forEach(section => {
        if (section && section !== "[") {
            const parsed = parse("["+section);
            iniObjects.push(parsed);
        }
    })
    return iniObjects;
}

export function getIniValues(object: IIniObject): Dict<string> {
    return Object.entries(object)[0][1] as Dict<string>;
}