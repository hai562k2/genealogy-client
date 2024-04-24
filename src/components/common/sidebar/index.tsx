import React from "react";
import { Epath } from "../../../utils/Epath";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({
  small,
  callBack,
}: {
  small: boolean;
  callBack?: (type: string) => void;
}) => {
  const items = [
    {
      key: "home",
      link: Epath.HOME,
      label: "Quản lý bài đăng",
      icon: faChartSimple,
    },
  ];

  const handleClick = () =>
    callBack && callBack(small ? "DEFAULT_SIZE" : "SMALL_SIZE");

  return (
    <div className="w-full h-screen bg-sidebar text-white">
      <div className="flex items-center justify-center box-border h-[52px]">
        <img alt="logo" src={logo} width={36} height={36} />
      </div>
      <div
        className="box-border"
        style={{ height: "calc(100vh - 52px)", overflow: "hidden" }}
      >
        {items.map((item) => (
          <NavLink
            key={item.key}
            to={item.link}
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold bg-active-link"
                : "text-no-active hover:bg-active-link hover:text-white hover:font-semibold"
            }
            style={{
              height: "36px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              boxSizing: "border-box",
            }}
          >
            <div
              className={`flex items-center w-full gap-[12px] text-[13px]
                            ${small ? "justify-center" : "pl-2"}`}
              style={{ whiteSpace: "nowrap" }}
            >
              <FontAwesomeIcon icon={item.icon} />
              {!small && item.label}
            </div>
          </NavLink>
        ))}
      </div>
      <div className="w-full relative bottom-[50px] flex justify-center">
        <FontAwesomeIcon
          icon={!small ? faCircleArrowLeft : faCircleArrowRight}
          style={{ fontSize: "24px", cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Sidebar;
