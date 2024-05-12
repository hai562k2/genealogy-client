import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.sass";
import { localGetItem } from "../../utils/storage";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getUserInforByIdAsync } from "../../store/features/memberSlice";
import { Form, Input, Radio, RadioChangeEvent, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import DisplayAvatar from "./DisplayAvatar";
import c from "clsx";
import { uploadApiManagement } from "../../utils/helpers";
import { UploadOutlined } from "@ant-design/icons";
import noImage from "../../assets/images/logo.png";
import { UserData, updateUserAsync } from "../../store/features/authSlice";

const Profile = () => {
  const userLocal = JSON.parse(localGetItem("user") || "null");
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const user = useAppSelector((state) => state.UserInfoByIdReducer.data);

  const [gender, setGender] = useState("");
  const handleGender = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };
  useEffect(() => {
    dispatch(getUserInforByIdAsync(Number(userLocal?.id)));
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      gender: user.gender,
      lunarBirthday: user.lunarBirthday
        ? dayjs(user.lunarBirthday, "YYYY/MM/DD")
        : undefined,
      country: user.country,
      phone: user.phone,
      job: user.job,
    });
  }, [form, user]);

  const [fileInfoList, setFileInfoList] = useState<
    { file: string; type: string; name?: string }[]
  >([]);
  const [errorFileUpload, setErrorFileUpload] = useState<boolean>(false);

  const [createStringURLImage, setCreateStringURLImage] = useState<any>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [initImg, setInitImg] = useState<any>(null);

  const [loadingButton, setLoadingButton] = useState<boolean>(false);

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

  useEffect(() => {
    setInitImg(user.image[0]);
  }, [user]);

  const handleFormSubmit = (values: UserData) => {
    const newParams = {
      name: values.name,
      gender: values.gender,
      lunarBirthday: values.lunarBirthday,
      job: values.job,
      phone: values.phone,
      country: values.country,
      image: createStringURLImage,
    };
    console.log("data", newParams);
    dispatch(updateUserAsync({ id: userLocal.id, data: newParams }));
    dispatch(getUserInforByIdAsync(Number(userLocal?.id)));
    setLoadingButton(false);
  };

  return (
    <div className="h-[calc(100vh-150px)] overflow-y-auto lg:h-[calc(100vh-64px)]">
      <div className="m-auto max-w-[1200px] p-4 font-noto">
        <div className={style.box_account}>
          <div
            className={c(
              style.avatar,
              "relative flex flex-col items-center gap-3"
            )}
          >
            <label className="cursor-pointer">
              <div className="h-[80px] w-[80px] rounded-[50%] border border-[#ccc] pointer-events-none">
                <img
                  src={initImg || noImage}
                  alt="avatar"
                  className="w-full rounded-[50%] object-cover"
                />
              </div>
            </label>
            <Button
              loading={loadingButton}
              icon={<UploadOutlined />}
              style={{
                backgroundColor: "#f0f2f5",
                color: "#333333",
              }}
              onClick={handelUpload}
            >
              Tải ảnh lên
            </Button>
            <input
              id="file-upload"
              type="file"
              ref={inputRef}
              accept="image/*"
              className="hidden"
              onChange={uploadImage}
            />
          </div>
          <Form onFinish={handleFormSubmit} form={form}>
            <Form.Item
              label="Tên"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên" }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ color: "#333333", marginBottom: "20px" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email" }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ color: "#333333", marginBottom: "20px" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[{}]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ color: "#333333", marginBottom: "20px" }}
            >
              <Radio.Group onChange={handleGender} value={gender}>
                <Radio value={"male"}>Nam</Radio>
                <Radio value={"female"}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="lunarBirthday"
              rules={[{ required: false }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ color: "#333333", marginBottom: "20px" }}
            >
              <DatePicker format="YYYY/MM/DD" />
            </Form.Item>
            <Form.Item
              label="Quốc tịch"
              name="country"
              rules={[{}]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ color: "#333333", marginBottom: "20px" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{}]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ color: "#333333", marginBottom: "20px" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Nghề nghiệp"
              name="job"
              rules={[{}]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ color: "#333333", marginBottom: "20px" }}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sửa
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
