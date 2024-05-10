import React from "react";
import { localGetItem } from "../../utils/storage";

type Props = {
  path?: string;
  className?: string;
  nameUser: string;
};
const DisplayAvatar: React.FC<Props> = (props: Props) => {
  const { path, className, nameUser } = props;
  const user = JSON.parse(localGetItem("user") || "null");

  return (
    <>
      {path ? (
        <img
          src={user?.image[0]}
          className={`h-full object-cover ${
            className ?? "h-[80px] w-[80px] rounded-full"
          }`}
          alt="avt"
          loading="lazy"
        />
      ) : (
        <p
          className={`${
            className ?? "h-[80px] w-[80px] text-4xl leading-[80px]"
          } rounded-full bg-[#D9D9D9] text-center uppercase `}
        >
          {user?.name?.charAt(0)}
        </p>
      )}
    </>
  );
};

export default DisplayAvatar;
