import FileMenu from "./menus/FileMenu";
import ViewMenu from "./menus/ViewMenu";

export default function TopBar() {
    return (
        <div className="top-bar">
            <FileMenu/>
            <ViewMenu/>
        </div>
    )
}