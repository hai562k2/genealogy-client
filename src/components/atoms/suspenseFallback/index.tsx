import { Spin } from "antd";
import React from "react";

const SuspenseFallback = () => {
    return (
        <div className="w-full h-[100vh] fixed top-0 left-0 bg-[#00000085] z-[1001]">
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <Spin size="large" />
            </div>
        </div>
    )
};

export default SuspenseFallback;