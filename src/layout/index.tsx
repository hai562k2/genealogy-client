import { Outlet } from "react-router-dom"
import Sidebar from "../components/common/sidebar";
import { useCallback, useReducer, useState } from "react";
import Header from "../components/common/header";
import "./style.scss";
import SidebarMobile from "../components/common/sidebarMoblie";

const initSizeSidebar = {
    small: false,
    width: 200
}

const sidebarReducer = (state: object, action: string) => {
    switch (action) {
        case 'SMALL_SIZE':
            return {
                small: true,
                width: 60,
            };
        case 'DEFAULT_SIZE':
            return {
                small: false,
                width: 200,
            };
        default:
            return {
                small: false,
                width: 200,
            }
    }
}

const AdminLayout = () => {
    const [sizeSidebar, dispatch] = useReducer(sidebarReducer, initSizeSidebar);
    const [showSidebarMobile, setShowSidebarMobile] = useState(false);

    const changeSize = useCallback((type: string) => {
        dispatch(type);
    }, []);

    const onShow = () => {
        setShowSidebarMobile(!showSidebarMobile);
    }

    return (
        <div className="flex relative w-full">
            {showSidebarMobile && <SidebarMobile callBack={onShow}/>}
            <div
                className="sidebar duration-500 box-border"
                style={{ width: sizeSidebar.width }}
            >
                <Sidebar small={sizeSidebar.small} callBack={changeSize}/>
            </div>
            <div className="w-full box-border duration-500 flex-1">
                <Header onClick={onShow}/>
                <div className="bg-[#e4e9e7] pl-3 pt-3 pr-2 pb-2 box-border" style={{height: `calc(100vh - 52px)`}}>
                    <div className="rounded bg-white h-full box-border overflow-auto">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout;