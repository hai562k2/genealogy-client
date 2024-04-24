import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import { TooltipPlacement } from "antd/es/tooltip";
import React, { ReactNode } from "react";

const CustomPopover = ({
    icon, title, content, placement
}: {
    icon: IconProp;
    title?: ReactNode;
    content?: ReactNode;
    placement?: TooltipPlacement;
}) => {
    return (
        <Popover placement={placement} content={content} title={title} trigger="click">
            <FontAwesomeIcon className="cursor-pointer" icon={icon} />
        </Popover>
    )
};

export default CustomPopover;