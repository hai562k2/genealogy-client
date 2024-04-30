import React, { useEffect, useState } from "react";
import MyFamilyTree from "../family-tree/MyFamilyTree";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useParams } from "react-router-dom";
import { getMemberByClanAsync } from "../../store/features/memberSlice";

export const GenealogyTree = () => {
  const dispatch = useAppDispatch();
  const { clanId } = useParams();
  const members = useAppSelector((state) => state.memberSlice.data);
  const [resultMemeberClan, setResultMemberClan] = useState<Node | null>(null);

  useEffect(() => {
    dispatch(getMemberByClanAsync(Number(clanId)));
  }, [clanId]);
  console.log(members);

  const nodes = [
    {
      id: 1,
      pids: [2],
      name: "abc",
      gender: "female",
      img: [
        "http://localhost:3000/api/v1/files/images%2F7adfc1ffd279c711ed5bb.png",
      ],
    },
    {
      id: 2,
      pids: [1],
      name: "Ava Field",
      gender: "male",
      img: ["https://cdn.balkan.app/shared/m30/5.jpg"],
    },
    {
      id: 3,
      mid: 1,
      fid: 2,
      name: "Peter Stevens",
      gender: "male",
      img: [
        "http://222.252.23.157:62399/api/v1/files/3b021026e9b0801d65676.png",
      ],
    },
    {
      id: 4,
      mid: 1,
      fid: 2,
      name: "Savin Stevens",
      gender: "male",
      img: [
        "http://localhost:3001/api/v1/files/images%2Facae2491d462b477aa8df.png",
      ],
    },
    {
      id: 5,
      mid: 1,
      fid: 2,
      name: "Emma Stevens",
      gender: "female",
      des: "abc",
    },
  ];

  const nodes1 = members.map((item) => ({
    id: item.id,
    pids: item.partnerId || undefined,
    mid: item.motherId || undefined,
    fid: item.fatherId || undefined,
    name: item.name || "",
    gender: item.gender || "",
    img: item.image || [],
  }));

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
