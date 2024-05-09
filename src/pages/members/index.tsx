import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  getAllMemberByClanAsync,
  getMemberByClanAsync,
  getUserByIdAsync,
  inviteMember,
} from "../../store/features/memberSlice";
import {
  Table,
  Input,
  Button,
  FloatButton,
  Form,
  Modal,
  Dropdown,
  MenuProps,
  Space,
  Radio,
  RadioChangeEvent,
} from "antd";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { FormInviteMember } from "../../utils/typeForm";
import { loading } from "../../store/features/spinSlice";

const Member = () => {
  const { clanId } = useParams();
  const dispatch = useAppDispatch();
  const members = useAppSelector((state) => state.memberSlice.data);
  const allMembers = useAppSelector((state) => state.AllMemberReducer.data);
  const member = useAppSelector((state) => state.UserByIdReducer.data);
  const navigate = useNavigate();

  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState(""); // State để lưu từ khóa tìm kiếm
  const [parentList, setParentList] = useState<{ name: string; id: number }[]>(
    []
  );
  const [itemsFather, setItemsFather] = useState<any>();
  const [itemsMother, setItemsMother] = useState<any>();
  const [itemsPartner, setItemsPartner] = useState<any>([]);
  const [fatherName, setFatherName] = useState<string>("Chọn tên cha");
  const [motherName, setMotherName] = useState<string>("Chọn tên mẹ");
  const [partnerName, setPartnerName] = useState<string>(
    "Chọn tên vợ hoặc chồng"
  );
  const [fatherId, setFatherId] = useState<number>();
  const [motherId, setMotherId] = useState<number>();
  const [partnerId, setPartnerId] = useState<number>();
  const [gender, setGender] = useState("");
  const [roleCd, setRoleCd] = useState(2);
  const [form] = Form.useForm();

  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllMemberByClanAsync(Number(clanId)));
  }, [clanId]);

  useEffect(() => {
    if (allMembers.length > 0) {
      const parent: any = [];

      allMembers.forEach((item) => {
        parent.push({
          name: item.name,
          id: item.id,
        });
      });

      const itemsFather: MenuProps["items"] = parent.map((item: any) => ({
        label: (
          <p
            onClick={() => {
              setFatherName(item.name);
              setFatherId(item.id);
            }}
          >
            {item.name}
          </p>
        ),
        key: item.id.toString(),
      }));

      const itemsMother: MenuProps["items"] = parent.map((item: any) => ({
        label: (
          <p
            onClick={() => {
              setMotherName(item.name);
              setMotherId(item.id);
            }}
          >
            {item.name}
          </p>
        ),
        key: item.id.toString(),
      }));

      const itemsPartner: MenuProps["items"] = parent.map((item: any) => ({
        label: (
          <p
            onClick={() => {
              setPartnerName(item.name);
              setPartnerId(item.id);
            }}
          >
            {item.name}
          </p>
        ),
        key: item.id.toString(),
      }));

      setItemsFather(itemsFather);
      setItemsMother(itemsMother);
      setItemsPartner(itemsPartner);
      setParentList(parent);
    }
  }, [allMembers]);

  const handleAddClick = () => {
    setIsUpdate(false);
    setModalVisible(true);
    form.resetFields();
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (member && member.__members__) {
      setModalVisible(true);
      form.setFieldValue("name", member.__members__.name);
      form.setFieldValue("email", member.__members__.email);
      setFatherName(member.__members__.fatherName?.toString() || "");
      setMotherName(member.__members__.motherName?.toString() || "");
      form.setFieldValue("gender", member.__members__.gender || "");
      form.setFieldValue("roleCd", member.roleCd);
    }
  }, [member, form]);

  const handleEdit = (id: number) => {
    dispatch(getUserByIdAsync({ clanId: Number(clanId), userId: Number(id) }));
    setModalVisible(true);
  };

  useEffect(() => {
    console.log(member);
  }, [member]);

  const handleFormSubmit = (values: FormInviteMember) => {
    const params = {
      name: values.name,
      email: values.email,
      motherId: motherId || undefined,
      fatherId: fatherId || undefined,
      partnerId: partnerId ? [partnerId] : [],
      gender: values.gender,
      roleCd: values.roleCd,
    };

    form.resetFields();
    dispatch(inviteMember({ params, id: Number(clanId) }));
    setModalVisible(false);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    dispatch(
      getMemberByClanAsync({
        page: currentPage,
        limit: pageSize,
        clanId: Number(clanId),
        keyword: searchKeyword,
      })
    );
  }, [clanId, currentPage, pageSize, dispatch, searchKeyword]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (gender: string) => (
        <span>
          {gender === "male" ? "Nam" : gender === "female" ? "Nữ" : ""}
        </span>
      ),
    },
    {
      title: "Id bố",
      dataIndex: "fatherId",
      key: "fatherId",
    },
    {
      title: "Tên bố",
      dataIndex: "fatherName",
      key: "fatherName",
    },
    {
      title: "Id mẹ",
      dataIndex: "motherId",
      key: "motherId",
    },
    {
      title: "Tên mẹ",
      dataIndex: "motherName",
      key: "motherName",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
      render: (record: any) => {
        const inputDate = new Date(record);
        const localDate = inputDate.toLocaleDateString();
        return <span>{localDate}</span>;
      },
    },
    {
      title: "",
      key: "action",
      with: "15%",
      dataIndex: "id",
      render: (record: any) => {
        return (
          <div>
            <Button
              style={{
                marginRight: "0.5rem",
                padding: "0.25rem",
                borderRadius: "0.375rem",
                backgroundColor: "#007bff",
                color: "#fff",
                transition: "background-color 0.3s",
              }}
              onClick={() => handleEdit(record)}
            >
              <MdOutlineEdit className="text-white" />
            </Button>
            <Button
              style={{
                marginRight: "0.5rem",
                padding: "0.25rem",
                borderRadius: "0.375rem",
                backgroundColor: "#dc2626",
                color: "#fff",
                transition: "background-color 0.3s",
              }}
            >
              <MdDelete className="text-white" />
            </Button>
          </div>
        );
      },
    },
    // Thêm các cột khác tương ứng với thông tin thành viên
  ];

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 10);
  };

  const handleSearch = () => {
    dispatch(
      getMemberByClanAsync({
        page: currentPage,
        limit: pageSize,
        clanId: Number(clanId),
        keyword: searchKeyword, // Truyền từ khóa tìm kiếm
      })
    );
  };

  const handleGender = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };

  const handleRoleCd = (e: RadioChangeEvent) => {
    setRoleCd(e.target.value);
  };

  return (
    <div>
      <Input
        placeholder="Search by name"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)} // Cập nhật state khi người dùng nhập vào ô tìm kiếm
        style={{ width: 200, marginBottom: 16 }}
      />
      <Button type="primary" onClick={handleSearch}>
        Search
      </Button>{" "}
      {/* Nút để kích hoạt việc tìm kiếm */}
      <Table
        dataSource={members.items}
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: members.total,
          onChange: handlePageChange,
        }}
      />
      <FloatButton
        icon={<PlusOutlined style={{ fontSize: "1.2rem" }} />}
        type="primary"
        onClick={handleAddClick}
      />
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
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
            labelCol={{ span: 24 }} // Đặt labelCol span thành 24 để label chiếm toàn bộ width
            wrapperCol={{ span: 24 }} // Đặt wrapperCol span thành 24 để input chiếm toàn bộ width
            style={{ color: "#333333", marginBottom: "20px" }} // Thêm margin bottom để tách các Form.Item
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
            label="Bố"
            name="fatherId"
            rules={[{}]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ color: "#333333", marginBottom: "20px" }}
          >
            <Dropdown menu={{ items: itemsFather }}>
              <Button style={{ width: "100%", position: "relative" }}>
                <Space>
                  {fatherName}
                  <DownOutlined
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                </Space>
              </Button>
            </Dropdown>
          </Form.Item>
          <Form.Item
            label="Mẹ"
            name="motherId"
            rules={[{}]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ color: "#333333", marginBottom: "20px" }}
          >
            <Dropdown menu={{ items: itemsMother }}>
              <Button style={{ width: "100%", position: "relative" }}>
                <Space>
                  {motherName}
                  <DownOutlined
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                </Space>
              </Button>
            </Dropdown>
          </Form.Item>
          <Form.Item
            label="Vợ hoặc Chồng"
            name="partnerId"
            rules={[{}]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ color: "#333333", marginBottom: "20px" }}
          >
            <Dropdown menu={{ items: itemsPartner }}>
              <Button style={{ width: "100%", position: "relative" }}>
                <Space>
                  {partnerName}
                  <DownOutlined
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                </Space>
              </Button>
            </Dropdown>
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
            label="Chức vụ"
            name="roleCd"
            rules={[{ required: true, message: "Vui lòng chọn chức vụ!" }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ color: "#333333", marginBottom: "20px" }}
          >
            <Radio.Group onChange={handleRoleCd} value={roleCd}>
              <Radio value={1}>Quản lí</Radio>
              <Radio value={2}>Thành viên</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      ;
    </div>
  );
};

export default Member;
