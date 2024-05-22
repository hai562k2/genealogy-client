import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEvent,
  getEventByClanAsync,
} from "../../store/features/EventSlice";
import DefaultText from "../../components/Text/DefaultText";
import { nanoid } from "nanoid";
import {
  Card,
  FloatButton,
  Modal,
  Pagination,
  PaginationProps,
  Form,
  Input,
  Button,
  DatePicker,
} from "antd";
import Meta from "antd/es/card/Meta";
import { convertDateTime, uploadApiManagement } from "../../utils/helpers";
import errImg from "../../assets/images/logo.png";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import noImage from "../../assets/images/logo.png";
import { FormAddEvent } from "../../utils/typeForm";
import moment from "moment";
import { getRoleMemberAsync } from "../../store/features/memberSlice";

const EventFamily = () => {
  const { clanId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.EventSlice.data);
  const event = useAppSelector((state) => state.EventByIdReducer.data);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [form] = Form.useForm();
  const roleMember = useAppSelector(
    (state) => state.RoleMemberByIdReducer.data
  );

  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [initImg, setInitImg] = useState<any>(null);
  const [errorFileUpload, setErrorFileUpload] = useState<boolean>(false);
  const [createStringURLImage, setCreateStringURLImage] = useState<any>([]);
  const [fileInfoList, setFileInfoList] = useState<
    { file: string; type: string; name?: string }[]
  >([]);

  const handleAddClick = () => {
    setModalVisible(true);
    form.resetFields();
    setInitImg(null);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

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

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
  };

  const loadData = () => {
    dispatch(
      getEventByClanAsync({
        page: currentPage,
        limit: pageSize,
        clanId: Number(clanId),
        keyword: searchKeyword,
      })
    );
  };
  //

  const convertToDefaultTime = (isoString: string): string => {
    const date = moment(isoString);
    // Đặt giờ và phút mặc định là 10:00
    date.hour(10).minute(0).second(0).millisecond(0);
    return date.format("YYYY-MM-DD HH:mm");
  };

  const handleFormSubmit = async (values: FormAddEvent) => {
    const isoTime = values.timeEvent.toString();
    const formattedTime = convertToDefaultTime(isoTime);
    const newParams = {
      title: values.title,
      content: values.content,
      timeEvent: formattedTime,
      image: createStringURLImage,
      clanId: Number(clanId),
    };

    form.resetFields();
    setLoadingButton(false);
    await dispatch(createEvent(newParams));
    loadData();
    setInitImg(null);
    setModalVisible(false);
  };

  useEffect(() => {
    loadData();
  }, [clanId, currentPage, pageSize, searchKeyword]);

  useEffect(() => {
    dispatch(getRoleMemberAsync(Number(clanId)));
  }, [clanId]);

  return (
    <div>
      <div>
        {events.items.map((event) => (
          <div
            className="flex gap-4 items-center cursor-pointer hover:opacity-80"
            onClick={() =>
              navigate(`/event/${clanId}/event-detail/${event.id}`)
            }
          >
            <img
              alt={event.title}
              src={event.image[0] || errImg}
              className="h-[150px] object-cover"
            />
            <div className="flex flex-col">
              <h3 className="line-clamp-1">{event.title}</h3>
              <p className="line-clamp-2 mt-3">{event.content}</p>
              <p className="mt-4 text-xs text-[#ccc]">
                {convertDateTime(event.timeEvent as Date)}
              </p>
            </div>
          </div>
        ))}
        <Pagination
          current={currentPage}
          onChange={onChange}
          total={events.total}
          defaultPageSize={pageSize}
        />
      </div>
      <div className={`${roleMember.roleCd === 2 ? "hidden" : ""}`}>
        <FloatButton
          icon={<PlusOutlined style={{ fontSize: "1.2rem" }} />}
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
            label="Tên sự kiện"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tên sự kiện" }]}
            labelCol={{ span: 24 }} // Đặt labelCol span thành 24 để label chiếm toàn bộ width
            wrapperCol={{ span: 24 }} // Đặt wrapperCol span thành 24 để input chiếm toàn bộ width
            style={{ color: "#333333", marginBottom: "20px" }} // Thêm margin bottom để tách các Form.Item
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nội dung"
            name="content"
            rules={[
              { required: true, message: "Vui lòng nhập nội dung sự kiện" },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ color: "#333333", marginBottom: "20px" }}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            label="Thời gian"
            name="timeEvent"
            rules={[{ required: true }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ color: "#333333", marginBottom: "20px" }}
          >
            <DatePicker format="YYYY/MM/DD HH:mm" />
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

export default EventFamily;
