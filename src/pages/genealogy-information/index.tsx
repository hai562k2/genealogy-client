import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getClanByIdAsync } from "../../store/features/clanSlice";

const ClanInformation = () => {
  const { clanId } = useParams();
  const dispatch = useAppDispatch();
  const clan = useAppSelector((state) => state.clanByIdReducer.data);

  useEffect(() => {
    dispatch(getClanByIdAsync(Number(clanId)));
  }, [clanId]);
  console.log(clan);
  return (
    <div>
      <h1>{clan.name}</h1>
      <p>{clan.information}</p>
      <img src={clan.image[0]} alt="" />
      {/* Hiển thị thông tin của clan tại đây */}
    </div>
  );
};

export default ClanInformation;
