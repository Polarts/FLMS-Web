import * as fsPromises from 'fs/promises'
import { parseFromString } from "../IniParser";

describe("ini parser functionality test", () => {
    it("returns ini as an array of IIniObject", async () => {
        const text = await fsPromises.readFile("D:\\Discovery Freelancer\\DATA\\UNIVERSE\\SYSTEMS\\BR01\\br01.ini", 'utf-8');
        const result = parseFromString(text);
        expect(result).toMatchSnapshot();
    })
});