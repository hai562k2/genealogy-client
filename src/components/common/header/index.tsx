import { Button, Dropdown, MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Epath } from "../../../utils/Epath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { clearAuth } from "../../../store/features/authSlice";
import { localClearStorage, localGetItem } from "../../../utils/storage";
import { getClanAsync } from "../../../store/features/clanSlice";
import IconPlus from "../../icon/IconPlus";
import DefaultText from "../../Text/DefaultText";
import { PlusOutlined } from "@ant-design/icons";

const Header = ({ onClick }: { onClick: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const clans = useAppSelector((state) => state.clanSlice.data);
  const user = JSON.parse(localGetItem("user") || "null");

  const [modalVisible, setModalVisible] = useState(false);

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  interface FormValues {
    title: string;
    area: number;
    // Thêm các trường dữ liệu khác của form vào đây nếu cần
  }

  const handleFormSubmit = (values: FormValues) => {
    console.log("Form submitted with values:", values);
    // Add your form submission logic here
    setModalVisible(false);
  };

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

  useEffect(() => {
    dispatch(getClanAsync({}));
  }, []);

  // Set default navigate to the first clan
  useEffect(() => {
    if (clans.length > 0) {
      navigate(`clan/${clans[0].id}`);
    }
  }, [clans, navigate]);

  const handleNavigate = (id: number) => {
    if (location.pathname.includes("family-tree")) {
      navigate(`/family-tree/${id}`);
    } else if (location.pathname.includes("clan")) {
      navigate(`/clan/${id}`);
    } else if (location.pathname.includes("event")) {
      navigate(`/event/${id}`);
    }
  };

  return (
    <div className="flex items-center justify-between p-2 sticky-top bg-[#ffffff] shadow-2xl h-[52px] box-border">
      <div className="flex items-center gap-[12px]">
        <div className="ml-[5px] cursor-pointer icon-bars" onClick={onClick}>
          <FontAwesomeIcon icon={faBars} style={{ fontSize: "22px" }} />
        </div>
        <h3>Genealogy</h3>
      </div>
      <div className="flex items-center gap-4">
        {clans.map((clan) => (
          <div
            key={clan.id}
            className="px-4 py-2 hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
            onClick={() => handleNavigate(clan.id)}
          >
            {clan.name}
          </div>
        ))}
      </div>
      <div>
        <Button
          style={{
            border: "none",
            boxShadow: "none",
            padding: 0,
            backgroundColor: "transparent",
          }}
          icon={<PlusOutlined style={{ fontSize: "16px" }} />}
        >
          THÊM DÒNG HỌ
        </Button>
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
