import React, { useEffect, useState } from "react";
import MyFamilyTree from "../family-tree/MyFamilyTree";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useParams } from "react-router-dom";
import { getMemberByClanAsync } from "../../store/features/memberSlice";

export const GenealogyTree = () => {
  const [nodes, setNodes] = useState<any>([]); // Khởi tạo nodes với mảng trống

  const dispatch = useAppDispatch();
  const { clanId } = useParams();
  const members = useAppSelector((state) => state.memberSlice.data);

  useEffect(() => {
    dispatch(getMemberByClanAsync(Number(clanId)));
  }, [clanId]);

  useEffect(() => {
    if (members.length !== 0) {
      const updatedNodes = members.map((item) => ({
        id: item?.id,
        pids: item?.partnerId ?? [],
        mid: members.find((member) => member.id == item.motherId)
          ? item.motherId
          : null,
        fid: members.find((member) => member.id == item.motherId)
          ? item.fatherId
          : null,
        name: item?.name ?? null,
        gender: item?.gender ?? null,
        img: item?.image ?? [],
        birthday: item?.birthday ?? null,
        lunarBirthday: item?.lunarBirthday ?? null,
        country: item?.country ?? null,
        phone: item?.phone ?? null,
        job: item?.job ?? null,
        workAddress: item?.workAddress ?? null,
        description: item?.description ?? null,
        deadDay: item?.deadDay ?? null,
        lunarDeadDay: item?.lunarDeadDay ?? null,
      }));
      setNodes(updatedNodes);
    }
  }, [members]); // Cập nhật nodes khi members thay đổi

  return (
    <div>
      <div>
        {/* Chèn MyFamilyTree vào LayoutTop */}
        <MyFamilyTree nodes={nodes} />
        {/* Các phần còn lại của LayoutTop */}
        <div className="other-components">
          {/* Đây là nơi để bạn đặt các phần tử khác của LayoutTop */}
        </div>
      </div>
    </div>
  );
};
