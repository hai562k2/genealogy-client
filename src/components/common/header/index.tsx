import { Button, Dropdown, Menu, Modal, Form, Input, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Epath } from "../../../utils/Epath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { clearAuth } from "../../../store/features/authSlice";
import { localClearStorage, localGetItem } from "../../../utils/storage";
import { createClan, getClanAsync } from "../../../store/features/clanSlice";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { FormAddClan } from "../../../utils/typeForm";
import { uploadApiManagement } from "../../../utils/helpers";
import TextArea from "antd/es/input/TextArea";

const Header = ({ onClick }: { onClick: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const clans = useAppSelector((state) => state.clanSlice.data);
  const loading = useAppSelector((state) => state.spinSlice);
  const user = JSON.parse(localGetItem("user") || "null");
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const [modalVisible, setModalVisible] = useState(false);

  const handleAddClick = () => {
    setModalVisible(true);
    form.resetFields();
    setInitImg(null);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleFormSubmit = async (values: FormAddClan) => {
    const newParams = {
      name: values.name,
      information: values.information,
      image: createStringURLImage,
    };

    form.resetFields();
    setLoadingButton(false);
    await dispatch(createClan(newParams));
    loadClan();
    setInitImg(null);
    setModalVisible(false);
  };

  const logOut = () => {
    localClearStorage();
    dispatch(clearAuth());
    navigate(Epath.LOGIN);
  };

  const [fileInfoList, setFileInfoList] = useState<
    { file: string; type: string; name?: string }[]
  >([]);
  const [errorFileUpload, setErrorFileUpload] = useState<boolean>(false);
  const [createStringURLImage, setCreateStringURLImage] = useState<any>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [initImg, setInitImg] = useState<any>(null);

  const handelUpload = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };

  const uploadImage = (event: any) => {
    setLoadingButton(true);
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (fileType.startsWith("image/")) {
        setErrorFileUpload(false);
        const initImg = URL.createObjectURL(selectedFile);
        setInitImg(initImg);
        const fileInfo = {
          file: fileType.startsWith("image/") ? initImg : selectedFile.name,
          type: fileType,
        };
        uploadApiManagement.uploadImage(selectedFile).then((res) => {
          setCreateStringURLImage([`${res.data.data[0].path}`]);
          setLoadingButton(false);
        });
        setFileInfoList((prevArray) => [...prevArray, fileInfo]);
      } else setErrorFileUpload(true);
      setTimeout(() => setErrorFileUpload(false), 1200);
    }
  };

  //   console.log("string", createStringURLImage);
  // }, [createStringURLImage]);

  const [form] = Form.useForm();
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

  const loadClan = () => {
    dispatch(getClanAsync({}));
  };

  useEffect(() => {
    loadClan();
  }, [loading]);

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
    } else if (location.pathname.includes("member")) {
      navigate(`/member/${id}`);
    } else if (location.pathname.includes("information")) {
      navigate(`/information/${id}`);
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
        <Form onFinish={handleFormSubmit} form={form}>
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
            <TextArea />
          </Form.Item>
          <Form.Item
            label="Ảnh"
            name="image"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ color: "#333333", marginBottom: "20px" }}
          >
            <Button
              loading={loadingButton}
              icon={<UploadOutlined />}
              style={{ backgroundColor: "#f0f2f5", color: "#333333" }}
              onClick={handelUpload}
            >
              Tải ảnh lên
            </Button>

            <input
              ref={inputRef}
              id="file_upload"
              name="file_upload"
              type="file"
              className="sr-only"
              onChange={uploadImage}
            />
            {initImg && (
              <>
                <img
                  src={initImg}
                  alt=""
                  className="h-[88px] w-[88px] rounded-lg object-cover"
                />
              </>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" disabled={loadingButton} htmlType="submit">
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
