import React from "react";
import { useParams } from "react-router-dom";

const ClanInformation = () => {
  const { clanId } = useParams();

  return (
    <div>
      <h1>Clan Information</h1>
      <p>Clan ID: {clanId}</p>
      {/* Hiển thị thông tin của clan tại đây */}
    </div>
  );
};

export default ClanInformation;
