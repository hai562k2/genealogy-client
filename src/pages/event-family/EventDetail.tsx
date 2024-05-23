import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEventComment,
  getEventByClanAsync,
  getEventByIdAsync,
  updateEventAsync,
} from "../../store/features/EventSlice";
import DefaultText from "../../components/Text/DefaultText";
import { nanoid } from "nanoid";
import {
  Button,
  Card,
  DatePicker,
  FloatButton,
  Form,
  Input,
  Modal,
} from "antd";
import Meta from "antd/es/card/Meta";
import errImg from "../../assets/images/logo.png";
import { convertDateTime, uploadApiManagement } from "../../utils/helpers";
import {
  FormAddEvent,
  FormAddEventComment,
  FormUpdateEvent,
} from "../../utils/typeForm";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import dayjs from "dayjs";
import noImage from "../../assets/images/logo.png";

const EventDetailFamily = () => {
  const { clanId, eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const event = useAppSelector((state) => state.EventByIdReducer.data);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("house");
  const [comment, setComment] = useState<string>("");

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

  useEffect(() => {
    setInitImg(event.image[0]);
  }, [event]);

  const handleAddClick = () => {
    setModalVisible(true);
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

  const loadData = () => {
    dispatch(getEventByIdAsync(Number(eventId)));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddComment = async () => {
    const params = {
      content: comment,
      eventId: Number(eventId),
    };
    await dispatch(createEventComment(params));
    setComment("");
    loadData();
  };

  useEffect(() => {
    form.setFieldValue("title", event.title);
    form.setFieldValue("content", event.content);
    form.setFieldValue(
      "timeEvent",
      event.timeEvent ? dayjs(event.timeEvent, "YYYY/MM/DD HH:mm") : undefined
    );
  }, [event, form]);

  const convertToDefaultTime = (isoString: string): string => {
    const date = moment(isoString);
    // Đặt giờ và phút mặc định là 10:00
    date.hour(10).minute(0).second(0).millisecond(0);
    return date.format("YYYY-MM-DD HH:mm");
  };

  const handleFormSubmit = async (values: FormUpdateEvent) => {
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
    await dispatch(
      updateEventAsync({ params: newParams, id: Number(eventId) })
    );
    loadData();

    setModalVisible(false);
  };

  return (
    <div className="p-5 flex flex-col justify-center">
      {/* <ul className="list group mb-4">
        {events.map((event) => (
          <li key={event.id} className="list-groups-item">
            {event.content}
          </li>
        ))}
      </ul> */}
      <div className="flex items-center justify-center gap-2">
        <img
          src={event.user?.image[0] || errImg}
          alt={event.user?.name}
          className="w-[90px] h-auto rounded-full"
        />
        <div className="flex flex-col">
          <div>{event.user?.name}</div>
          <div className="text-[#ccc]">
            {convertDateTime(event.timeEvent as Date)}
          </div>
        </div>
      </div>
      <h3 className="text-center">{event.title}</h3>
      <img
        alt={event.title}
        src={event.image[0] || errImg}
        className="max-w-full max-h-[500px] h-auto rounded-lg object-contain"
      />
      <div
        dangerouslySetInnerHTML={{ __html: event.content }}
        className="min-h-[250px] p-2 break-words"
      />
      <div className="p-3 bg-[#f7f5f0] rounded-xl">
        <h4>Bình luận - {event.comments.length} bình luận</h4>
        {event.comments.map((eventComment) => (
          <div className="flex gap-3 mt-3">
            <img
              src={eventComment.user.image[0] || errImg}
              alt="avatar"
              className="rounded-full w-[40px] h-[40px]"
            />
            <div
              className="flex flex-1 flex-col gap-2 p-[10px] rounded-[10px] bg-white"
              style={{ border: "1px solid gray" }}
            >
              <div>
                <div className="text-[#ccc] text-xs">
                  {convertDateTime(eventComment.createdAt as Date)}
                </div>
                <div key={eventComment.id} className="list-groups-item text-xs">
                  {eventComment.user?.name}
                </div>
              </div>
              <div>{eventComment.content}</div>
            </div>
          </div>
        ))}
        <div className="flex mt-4 items-center gap-5">
          <Input
            name="comment-content"
            placeholder="Nhập bình luận ..."
            size="large"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <Button
            type="primary"
            size="large"
            onClick={handleAddComment}
            disabled={comment.length > 0 ? false : true}
          >
            Gửi
          </Button>
        </div>
      </div>
      <div className={`${roleMember.roleCd === 2 ? "hidden" : ""}`}>
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

export default EventDetailFamily;
