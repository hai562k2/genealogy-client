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
    <div className="flex flex-col justify-center items-center p-5">
      <img
        className="w-[200px] h-[200px] p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
        src={clan.image[0]}
        alt="Bordered avatar"
      />
      <h1 style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
        {clan.name}
      </h1>
      <div
        dangerouslySetInnerHTML={{
          __html: clan.information.replaceAll("\n", "<br />") || "",
        }}
      />
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
