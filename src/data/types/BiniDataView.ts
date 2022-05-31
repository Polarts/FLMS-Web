import jDataView from "jdataview";

export type INIStruct = { [section: string]: { [property: string]: string } };

/**
 * Extension of jDataView that reads BINI files.
 */
export default class BiniDataView extends jDataView {

    getReverseInt32(): number {
        const reverseBytes = this.getBytes(4).reverse();
        return new jDataView(reverseBytes).getInt32();
    }

    getReverseInt16(): number {
        const reverseBytes = this.getBytes(2).reverse();
        return new jDataView(reverseBytes).getInt16();
    }

    // TODO returns wrong values, pls debug
    /**
     * Reads the BINI file this data view is currently viewing.
     * @param byteLength the byteLength of the array passed in the ctor.
     */
    readBiniFile(byteLength: number): INIStruct[] | null {

        const retVal: INIStruct[] = [];
        const fileTag = this.getString(4);
        const version = this.getReverseInt32();

        // Check if it's really a bini file
        if (fileTag === "BINI" && version === 1) {

            const stringBlockOffset = this.getReverseInt32();

            // Save position of data start to return to it later.
            const dataPos = this.tell();
            console.log(
                'string block offset:', stringBlockOffset,
                'length:', byteLength,
                'position:', this.tell()
            );

            // Jump to the end of the string block. 
            this.seek(stringBlockOffset);

            // Cache the string block.
            const stringBlock = this.getString(byteLength - stringBlockOffset);

            // Return to the data position we saved earlier.
            this.seek(dataPos);

            while (this.tell() < stringBlockOffset && this.tell() < byteLength) {

                const iniStruct: INIStruct = {};

                const sectionNameOffset = this.getReverseInt16();
                console.log('section name offset:', sectionNameOffset, 'position:', this.tell());

                const sectionEntriesCount = this.getReverseInt16();
                console.log('section entries count:', sectionEntriesCount, 'position:', this.tell());

                const sectionName = stringBlock.substring(
                    sectionNameOffset,
                    stringBlock.indexOf('\0', sectionNameOffset) - sectionNameOffset
                );
                console.log('section name:', sectionName);
                

                iniStruct[sectionName] = {};

                for (let i = 0; i < sectionEntriesCount; i++) {

                    const entryNameOffset = this.getReverseInt16();
                    const entryValuesCount = this.getInt8();

                    const entryName = stringBlock.substring(
                        entryNameOffset,
                        stringBlock.indexOf('\0', entryNameOffset) - entryNameOffset
                    );

                    const entryValues: string[] = [];
                    for (let j = 0; j < entryValuesCount; j++) {
                        const valueType = this.getInt8();
                        switch(valueType) {
                            
                            case 1: // int
                                entryValues.push(this.getReverseInt32().toString());
                                break;

                            case 2: // float
                                entryValues.push(this.getFloat32().toString());
                                break;

                            default: // string
                                const valueNameOffset = this.getReverseInt32();
                                const entryValue = stringBlock.substring(
                                    valueNameOffset,
                                    stringBlock.indexOf('\0', valueNameOffset) - valueNameOffset
                                );
                                entryValues.push(entryValue);
                                break;
                        }
                    
                    }

                    iniStruct[sectionName][entryName] = entryValues.join(', ')
                }

                retVal.push(iniStruct);

            }

            return retVal;

        } else return null;
    }
}