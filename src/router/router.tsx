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
import ClanInformation from "../pages/genealogy-information";
import Member from "../pages/members";
import NotFoundMember from "../pages/NotFound/notFoundMember";
import NotFoundEvent from "../pages/NotFound/notFoundEvent";
import NotFoundGenealogy from "../pages/NotFound/notFoundGenealogy";
import NOtFoundFamilyTree from "../pages/NotFound/notFoundFamilyTree";
import EventFamily from "../pages/event-family";
import EventDetailFamily from "../pages/event-family/EventDetail";

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
          path: Epath.CLAN,
          element: <ClanInformation />,
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
        {
          path: Epath.CLAN_INFORMATION,
          element: <ClanInformation />,
        },
        {
          path: Epath.MEMBERS,
          element: <Member />,
        },
        {
          path: Epath.NOT_FOUND_MEMER,
          element: <NotFoundMember />,
        },
        {
          path: Epath.NOT_FOUND_EVENT,
          element: <NotFoundEvent />,
        },
        {
          path: Epath.NOT_FOUND_CLAN_INFORMATION,
          element: <NotFoundGenealogy />,
        },
        {
          path: Epath.NOT_FOUND_FAMILY_TREE,
          element: <NOtFoundFamilyTree />,
        },
        {
          path: Epath.EVENT,
          element: <EventFamily />,
        },
        {
          path: Epath.EVENT_DETAIL,
          element: <EventDetailFamily />,
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
