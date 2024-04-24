import { Dropdown, MenuProps } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Epath } from "../../../utils/Epath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { useAppDispatch } from "../../../store/hook";
import { clearAuth } from "../../../store/features/authSlice";
import { localClearStorage, localGetItem } from "../../../utils/storage";

const Header = ({ onClick }: { onClick: () => void }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = JSON.parse(localGetItem("user") || "null");

  const logOut = () => {
    localClearStorage();
    dispatch(clearAuth());
    navigate(Epath.LOGIN);
  };

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <p className="text-[13px]" onClick={() => navigate(Epath.PROFILE)}>
          Cá nhân
        </p>
      ),
    },
    {
      key: 2,
      label: (
        <p className="text-[13px]" onClick={logOut}>
          Đăng xuất
        </p>
      ),
    },
  ];

  return (
    <div className="flex items-center justify-between p-2 sticky-top bg-[#ffffff] shadow-2xl h-[52px] box-border">
      <div className="flex items-center gap-[12px]">
        <div className="ml-[5px] cursor-pointer icon-bars" onClick={onClick}>
          <FontAwesomeIcon icon={faBars} style={{ fontSize: "22px" }} />
        </div>
        <h3>Find Jod - Quản lý</h3>
      </div>
      <Dropdown menu={{ items }} trigger={["click"]} className="mr-[10px]">
        <span className="cursor-pointer font-semibold">
          {user?.name} <FontAwesomeIcon icon={faCaretDown} />
        </span>
      </Dropdown>
    </div>
  );
};

export default Header;

function localClearLocalStorage() {
  throw new Error("Function not implemented.");
}
