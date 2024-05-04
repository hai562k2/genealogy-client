import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getMemberByClanAsync } from "../../store/features/memberSlice";
import { Table } from "antd";

const Member = () => {
  const { clanId } = useParams();
  const dispatch = useAppDispatch();
  const members = useAppSelector((state) => state.memberSlice.data);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      getMemberByClanAsync({
        page: currentPage, // Trang hiện tại
        limit: 2, // Số lượng thành viên trên mỗi trang
        clanId: Number(clanId), // ID của clan
        keyword: "", // Từ khóa tìm kiếm (nếu có)
      })
    );
  }, [clanId, currentPage, dispatch]);

  const columns = [
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
    // Thêm các cột khác tương ứng với thông tin thành viên
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Table
        dataSource={members}
        columns={columns}
        pagination={{ current: currentPage, onChange: handlePageChange }}
      />
    </div>
  );
};

export default Member;
