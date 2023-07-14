import { useState } from "react";
import { Dict } from "../../utils/types";
import DataGrid from "../shared/data-grid/DataGrid";

export default function PropertyEditor() {

    const [data, setData] = useState<Dict<string>>({
        // TEST DATA:
        hello: "world",
        goodbye: "universe",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi aut nihil placeat explicabo ad velit?": "yes",
        ok: "ok",
        ok2: "ok",
        ok3: "ok",
        ok4: "ok",
        ok5: "ok",
        ok6: "ok",
        ok7: "ok",
    });

    function handleValueChange(key: string, value: string) {
        setData((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    return (
        <DataGrid data={data} onValueChange={handleValueChange}/>
    )
}