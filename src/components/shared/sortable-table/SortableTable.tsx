import { useCallback, useMemo, useState } from "react";
import { Dict } from "../../../utils/types";
import { ColumnDefinition, SortState } from "./SortableTable.interfaces";
import SortableTableRow from "./SortableTableRow";

export type OnSelectCallback<T> = (row: T, index: number) => void;

function getSortArrow(isDescending: boolean) {
    return isDescending ? "↑" : "↓";
}

type SortableTableProps<T> = {
    colDefs: Dict<ColumnDefinition<T>>;
    rows: T[];
    defaultSortKey?: string;
    onSelect?: OnSelectCallback<T>;
}

export default function SortableTable<T>({ colDefs, rows, defaultSortKey, onSelect }: SortableTableProps<T>) {

    const [sortState, setSortState] = useState<SortState>({
        key: defaultSortKey,
        isDescending: false
    });

    const [selectedIndex, setSelectedIndex] = useState(-1);

    const sortedRows = useMemo(() => {
        if (!sortState.key) return rows;
        let sortedRows = rows.sort(colDefs[sortState.key].compareFn);
        sortedRows = sortState.isDescending ? sortedRows.reverse() : sortedRows;
        return sortedRows;
    }, [colDefs, rows, sortState]);

    function handleSortChange(key: string) {
        setSortState(currSort => {
            if (currSort.key === key) {
                return {
                    ...currSort,
                    isDescending: !currSort.isDescending
                }
            } else {
                return {
                    key,
                    isDescending: false
                }
            }
        })
    }

    function handleRowSelect(row: T, index: number) {
        setSelectedIndex(index);
        onSelect && onSelect(row, index);
    }

    return (
        <table>
            <thead>
                <tr>
                    {Object.keys(colDefs).map(colKey => (
                        <th key={colKey} onClick={() => handleSortChange(colKey)}>
                            {colDefs[colKey].title} {sortState.key === colKey && getSortArrow(sortState.isDescending)}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {sortedRows.map((row, i) => <SortableTableRow key={i} colDefs={colDefs} index={i} row={row} onSelect={handleRowSelect} selectedIndex={selectedIndex} />)}
            </tbody>
        </table>
    )
}
