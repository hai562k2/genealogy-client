import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getMemberByClanAsync } from "../../store/features/memberSlice";
import { Table } from "antd";

const Member = () => {
  const { clanId } = useParams();
  const dispatch = useAppDispatch();
  const members = useAppSelector((state) => state.memberSlice.data);

  const [pageSize, setPageSize] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    dispatch(
      getMemberByClanAsync({
        page: currentPage, // Trang hiện tại
        limit: pageSize, // Số lượng thành viên trên mỗi trang
        clanId: Number(clanId), // ID của clan
        keyword: "", // Từ khóa tìm kiếm (nếu có)
      })
    );
  }, [clanId, currentPage, pageSize, dispatch]);

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

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 10); // Nếu pageSize được cung cấp, cập nhật pageSize mới
  };

  return (
    <div>
      <Table
        dataSource={members.items}
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: members.total, // Số lượng tổng thành viên (tính cả trên các trang khác)
          onChange: handlePageChange, // Xử lý khi người dùng thay đổi trang
        }}
      />
    </div>
  );
};

export default Member;
