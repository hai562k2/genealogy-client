import style from "@/layout/sidebar/style.module.sass";
import { NavLink } from "react-router-dom";
import React from "react";
import { TMenuItem } from "../../../types/common";
import DefaultText from "../../Text/DefaultText";
import { Epath } from "../../../utils/Epath";

type TProps = {
  items: TMenuItem[];
  toggleMenu: (type: string) => void;
  isPathActive: (path: string) => boolean;
};

const MenuItem: React.FC<TProps> = ({ items, toggleMenu, isPathActive }) => {
  const renderOpen = (isOpen: boolean) => {
    return isOpen ? (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7 10L12 15L17 10H7Z" fill="#615F50" />
      </svg>
    ) : (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 17L15 12L10 7V17Z" fill="#615F50" />
      </svg>
    );
  };

  return (
    <>
      {items.map((item) => (
        <div key={item.path}>
          {item.path === Epath.clan && <div className={style.line_menu} />}
          <ul className="menu-items">
            <div>
              <li className={isPathActive(item.path) ? style.active : ""}>
                <NavLink
                  to={item.path}
                  onClick={() => toggleMenu(item.path ?? "")}
                  className="flex h-10 w-full items-center pl-2"
                >
                  {item.subItems && renderOpen(!!item.isOpen)}
                  <DefaultText
                    variant="length"
                    className="!block flex-1 truncate text-[12px] text-on-surface"
                  >
                    {item.title}
                  </DefaultText>
                </NavLink>
              </li>
              {item.subItems && (
                <div
                  className={`${item.isOpen ? "block" : "hidden"} ${
                    style.child_box
                  }`}
                >
                  <MenuItem
                    items={item.subItems}
                    toggleMenu={toggleMenu}
                    isPathActive={isPathActive}
                  />
                </div>
              )}
            </div>
          </ul>
        </div>
      ))}
    </>
  );
};

export default MenuItem;
