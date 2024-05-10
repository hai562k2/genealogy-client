import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  getClanByIdAsync,
  updateClanAsync,
} from "../../store/features/clanSlice";
import { FloatButton } from "antd";
import { EditOutlined } from "@ant-design/icons";

const ClanInformation = () => {
  const { clanId } = useParams();
  const dispatch = useAppDispatch();
  const clan = useAppSelector((state) => state.clanByIdReducer.data);

  useEffect(() => {
    dispatch(getClanByIdAsync(Number(clanId)));
  }, [clanId]);

  const handleEdit = () => {};

  return (
    <div>
      <h1>{clan.name}</h1>
      <p>{clan.information}</p>
      <img src={clan.image[0]} alt="" />
      {/* Hiển thị thông tin của clan tại đây */}
      <div>
        <FloatButton
          icon={<EditOutlined style={{ fontSize: "1.2rem" }} />}
          type="primary"
          style={{ marginTop: 0 }}
          onClick={handleEdit}
        />
      </div>
    </div>
  );
};

export default ClanInformation;
