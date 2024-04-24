import React, { useCallback } from "react";
import Sidebar from "../sidebar";

const SidebarMobile = ({
    callBack
}: {
    callBack?: () => void;
}) => {

    const changeSize = useCallback((type: string) => {
        callBack && callBack();
    }, [callBack]);

    return(
        <div className="w-full h-[100vh] fixed top-0 left-0 bg-[#00000085] z-[999]">
            <div className="absolute top-0 left-0 w-[200px]">
                <Sidebar small={false} callBack={changeSize}/>
            </div>
        </div>
    )
};

export default SidebarMobile;