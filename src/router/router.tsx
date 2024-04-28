import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import AdminLayout from "../layout";
import { Epath } from "../utils/Epath";
import Profile from "../pages/profile";
import Login from "../pages/auth/login";
import SuspenseFallback from "../components/atoms/suspenseFallback";
import { useAppSelector } from "../store/hook";
import ProjectManager from "../pages/project-manager";
import { GenealogyTree } from "../pages/family-tree";

const RootRouter = () => {
  const isLoading = useAppSelector((state) => state.spinSlice.value);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRouter>
          <AdminLayout />
        </PrivateRouter>
      ),
      children: [
        {
          path: ":clanId",
          // element: <AdminLayout />,
          children: [
            {
              path: "",
              element: <ProjectManager />,
            },
          ],
        },
        {
          path: Epath.HOME,
          element: <ProjectManager />,
        },
        {
          path: Epath.PROFILE,
          element: <Profile />,
        },
        {
          path: Epath.FAMILY_TREE,
          element: <GenealogyTree />,
        },
      ],
    },
    {
      path: Epath.LOGIN,
      element: <Login />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} fallbackElement={<SuspenseFallback />} />
      {isLoading && <SuspenseFallback />}
    </>
  );
};

export default RootRouter;
