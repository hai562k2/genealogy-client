import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  getClanByIdAsync,
  updateClanAsync,
} from "../../store/features/clanSlice";
import { Button, FloatButton, Input, Modal, Form } from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import bgImage from "../../assets/images/background-clan-infor.png";
import TextArea from "antd/es/input/TextArea";
import { FormEditCan } from "../../utils/typeForm";
import { uploadApiManagement } from "../../utils/helpers";
import noImage from "../../assets/images/logo.png";

const ClanInformation = () => {
  const { clanId } = useParams();
  const dispatch = useAppDispatch();
  const clan = useAppSelector((state) => state.clanByIdReducer.data);

  useEffect(() => {
    dispatch(getClanByIdAsync(Number(clanId)));
  }, [clanId]);

  const [form] = Form.useForm();

  const [modalVisible, setModalVisible] = useState(false);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const handleAddClick = () => {
    dispatch(getClanByIdAsync(Number(clanId)));
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleFormSubmit = (values: FormEditCan) => {
    const newParams = {
      name: values.name || undefined,
      information: values.information || undefined,
      image: createStringURLImage,
    };

    form.resetFields();
    setLoadingButton(false);
    dispatch(updateClanAsync({ params: newParams, id: Number(clanId) }));
    dispatch(getClanByIdAsync(Number(clanId)));
    setModalVisible(false);
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

  useEffect(() => {
    form.setFieldsValue({
      name: clan.name,
      information: clan.information,
    });
  }, [form, clan]);

  useEffect(() => {
    setInitImg(clan.image[0]);
  }, [clan]);

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

  return (
    <div
      className={`flex flex-col items-center gap-3 p-5 h-full`}
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
    >
      <img
        className="w-[200px] h-[200px] mt-5 p-1 rounded-full"
        src={clan.image[0]}
        alt="Bordered avatar"
      />
      <h1
        style={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          fontFamily: "'VNI-THUPHAPTHANHCONG', sans-serif",
        }}
        className=""
      >
        {clan.name}
      </h1>
      <div
        dangerouslySetInnerHTML={{
          __html: clan.information.replaceAll("\n", "<br />") || "",
        }}
        style={{
          fontFamily: "'VNI-THUPHAPTHANHCONG', sans-serif",
          fontSize: "1rem",
        }}
      />
      <div>
        <FloatButton
          icon={<EditOutlined style={{ fontSize: "1.2rem" }} />}
          type="primary"
          style={{ marginTop: 0 }}
          onClick={handleAddClick}
        />
      </div>
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
                  src={initImg || noImage}
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
    </div>
  );
};

export default ClanInformation;
