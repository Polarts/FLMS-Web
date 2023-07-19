import { ReactNode } from "react";

export interface ColumnDefinition<T> {
    title: string;
    compareFn: (a: T, b: T) => number;
    cellRenderer?: (cellContent: string) => ReactNode;
}

export interface SortState {
    key?: string;
    isDescending: boolean;
}