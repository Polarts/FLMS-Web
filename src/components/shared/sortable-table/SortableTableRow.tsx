import { Dict } from "../../../utils/types";
import { OnSelectCallback } from "./SortableTable";
import { ColumnDefinition } from "./SortableTable.interfaces";

type SortableTableRowProps<T> = {
    colDefs: Dict<ColumnDefinition<T>>;
    onSelect: OnSelectCallback<T>;
    selectedIndex: number;
    row: T;
    index: number;
}

export default function SortableTableRow<T>({ colDefs, onSelect, selectedIndex, row, index, }: SortableTableRowProps<T>) {
    const rowDict = row as Dict<string>;
    return (
        <tr onClick={() => onSelect(row, index)} style={{background: selectedIndex === index? "lightblue" : "transparent"}}>
            {Object.entries(colDefs).map(([colKey, colDef]) => (
                <td key={index+colKey}>
                    {colDef.cellRenderer
                    ? colDef.cellRenderer(rowDict[colKey])
                    : rowDict[colKey]}
                </td>   
            ))}
        </tr>
    )
    
}
