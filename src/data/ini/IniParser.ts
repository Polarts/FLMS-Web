import { parse, IIniObject } from "js-ini";


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