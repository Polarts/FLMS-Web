import { IIniObject, parse } from "js-ini";
import { SECTION_REG } from "../../utils/regex";
import { Dict } from "../../utils/types";


export function parseFromString(iniText: string) {
    const iniObjects: IIniObject[] = [];
    const sectionTextMatches = [...iniText.matchAll(SECTION_REG)].map(s => s[0]);    
    sectionTextMatches.forEach(section => {
        if (section) {
            const parsed = parse(section);
            iniObjects.push(parsed);
        }
    })
    return iniObjects;
}

export function getIniValues(object: IIniObject): Dict<string> {
    return Object.entries(object)[0][1] as Dict<string>;
}