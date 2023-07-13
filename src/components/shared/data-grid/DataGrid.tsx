import { Dict } from "../../../utils/types";

type DataGridProps = {
    data: Dict<string>;
    onValueChange: (key: string, value: string) => void;
}

export default function DataGrid({ data, onValueChange }: DataGridProps) {

    return (
        <table className="data-grid">
            <thead>
                <tr>
                    <th>Property</th><th>Value</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(data).map(([key, value]) => (
                    <tr key={key}>
                        <td className="key-cell">
                            <div className="key-cell-content" title={key}>
                                {key}
                            </div>
                        </td>
                        <td className="value-cell">
                            <input type="text" value={value} onChange={(e) => onValueChange(key, e.target.value)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}