import { Button, Dropdown, Menu, Modal, Form, Input, Upload } from "antd";
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
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { FormAddClan } from "../../../utils/typeForm";

const Header = ({ onClick }: { onClick: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const clans = useAppSelector((state) => state.clanSlice.data);
  const user = JSON.parse(localGetItem("user") || "null");

  const [modalVisible, setModalVisible] = useState(false);

  const handleAddClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleFormSubmit = (values: FormAddClan) => {
    console.log("Form submitted with values:", values);
    // Add your form submission logic here
    setModalVisible(false);
  };

  const logOut = () => {
    localClearStorage();
    dispatch(clearAuth());
    navigate(Epath.LOGIN);
  };

  const items = [
    {
      key: "profile",
      label: "Cá nhân",
      onClick: () => navigate(Epath.PROFILE),
    },
    {
      key: "logout",
      label: "Đăng xuất",
      onClick: logOut,
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
      <Button
        style={{
          border: "none",
          boxShadow: "none",
          padding: 0,
          backgroundColor: "transparent",
        }}
        icon={<PlusOutlined style={{ fontSize: "16px" }} />}
        onClick={handleAddClick}
      >
        THÊM DÒNG HỌ
      </Button>
      <Modal
        open={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        centered
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 8,
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
          padding: 24,
          width: "80%",
        }}
      >
        <Form onFinish={handleFormSubmit}>
          <Form.Item
            label="Tên dòng họ"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên dòng họ" }]}
            labelCol={{ span: 24 }} // Đặt labelCol span thành 24 để label chiếm toàn bộ width
            wrapperCol={{ span: 24 }} // Đặt wrapperCol span thành 24 để input chiếm toàn bộ width
            style={{ color: "#333333", marginBottom: "20px" }} // Thêm margin bottom để tách các Form.Item
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Thông tin"
            name="information"
            rules={[
              { required: true, message: "Vui lòng nhập thông tin dòng họ" },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ color: "#333333", marginBottom: "20px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ảnh"
            name="image"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ color: "#333333", marginBottom: "20px" }}
          >
            <Upload>
              <Button
                icon={<UploadOutlined />}
                style={{ backgroundColor: "#f0f2f5", color: "#333333" }}
              >
                Tải ảnh lên
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Dropdown menu={{ items }} trigger={["click"]} className="mr-[10px]">
        <span className="cursor-pointer font-semibold">
          {user?.name} <FontAwesomeIcon icon={faCaretDown} />
        </span>
      </Dropdown>
    </div>
  );
};

export default Header;
