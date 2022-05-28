import Icon from "@mdi/react";
import { ClickEvent, MenuItem } from "@szhsin/react-menu";

type IconMenuItemProps = {
    icon: string,
    label: string,
    onClick?: (e: ClickEvent) => void
};

export default function IconMenuItem({
    icon,
    label,
    onClick
}: IconMenuItemProps) {
    return (
        <MenuItem onClick={onClick}>
            <Icon
                path={icon}
                size={0.8}
            />
            <span>{label}</span>
        </MenuItem>
    )
}