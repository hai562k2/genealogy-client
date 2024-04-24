import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Epath } from "../utils/Epath";
import { localGetItem } from "../utils/storage";

const PrivateRouter = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = localGetItem("token");
  if (!!isAuthenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to={Epath.LOGIN} />;
  }
};

export default PrivateRouter;
