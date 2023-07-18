import { createContext, FC, ReactNode, useRef } from "react";

type FilePickedCallback = (files: FileList | null) => Promise<void>;

export interface FilePickerContextState {
    saveFile: (blob: Blob, fileName: string) => void;
    pickFile: (callback: FilePickedCallback, accepts?: string, multiple?: boolean) => void;
}

export const FilePickerContext = createContext<FilePickerContextState>({
    saveFile: () => {},
    pickFile: () => {},
});

const FilePickerProvider: FC<{children: ReactNode}> = ({ children }) => {
    
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
        <FilePickerContext.Provider value={{
            saveFile,
            pickFile
        }}>
            <a ref={aRef} className="u-hidden" href="#"/>
            <input 
                ref={filePickerRef} 
                className="u-hidden"
                type="file" 
                onChange={filePicked}
            />
            {children}
        </FilePickerContext.Provider>
    );
}

export default FilePickerProvider;