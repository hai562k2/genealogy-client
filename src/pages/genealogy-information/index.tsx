import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  getClanByIdAsync,
  updateClanAsync,
} from "../../store/features/clanSlice";
import { FloatButton } from "antd";
import { EditOutlined } from "@ant-design/icons";
import bgImage from "../../assets/images/background-clan-infor.png";

const ClanInformation = () => {
  const { clanId } = useParams();
  const dispatch = useAppDispatch();
  const clan = useAppSelector((state) => state.clanByIdReducer.data);

  useEffect(() => {
    dispatch(getClanByIdAsync(Number(clanId)));
  }, [clanId]);

  const handleEdit = () => {};

  return (
    <div
      className={`flex flex-col items-center gap-3 p-5 h-full`}
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
    >
      <img
        className="w-[200px] h-[200px] mt-5 p-1 rounded-full"
        src={clan.image[0]}
        alt="Bordered avatar"
      />
      <h1
        style={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          fontFamily: "'VNI-Butlong', sans-serif",
        }}
        className=""
      >
        {clan.name}
      </h1>
      <div
        dangerouslySetInnerHTML={{
          __html: clan.information.replaceAll("\n", "<br />") || "",
        }}
        style={{ fontFamily: "'VNI-Briquet', sans-serif" }}
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
