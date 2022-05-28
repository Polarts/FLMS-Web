import { createContext, FC, ReactNode, useEffect, useRef, useState } from "react";

type FilePickedCallback = (files: FileList | null) => Promise<void>;

export interface FileContextState {
    saveFile: (blob: Blob, fileName: string) => void;
    pickFile: (callback: FilePickedCallback, accepts?: string, multiple?: boolean) => void;
}

export const FileContext = createContext<FileContextState>({
    saveFile: () => {},
    pickFile: () => {},
});

const FileProvider: FC<{children: ReactNode}> = ({ children }) => {
    
    const aRef = useRef<HTMLAnchorElement>(null);
    const filePickerRef = useRef<HTMLInputElement>(null);

    let filePickedCallback: FilePickedCallback;

    function saveFile(blob: Blob, fileName: string) {
        if (!!aRef.current) {
            const a = aRef.current;
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            a.click();
        }
    }

    function pickFile(
        callback: FilePickedCallback, 
        accepts?: string, 
        multiple?: boolean
    ) {
        if (!!filePickerRef.current) {
            const fp = filePickerRef.current;
            filePickedCallback = callback;
            if (!!accepts) fp.accept = accepts;
            if (!!multiple) fp.multiple = multiple;
            fp.click();
        }
    }

    async function filePicked() {
        if (!!filePickerRef.current) {
            await filePickedCallback(filePickerRef.current.files);
            filePickerRef.current.value = ''; // clears the value for the next time
        }
    }

    return (
        <FileContext.Provider value={{
            saveFile,
            pickFile
        }}>
            <a ref={aRef} className="u-hidden"/>
            <input 
                ref={filePickerRef} 
                className="u-hidden"
                type="file" 
                onChange={filePicked}
            />
            {children}
        </FileContext.Provider>
    );
}

export default FileProvider;