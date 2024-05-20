import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useNavigate, useParams } from "react-router-dom";
import { getEventByClanAsync } from "../../store/features/EventSlice";
import DefaultText from "../../components/Text/DefaultText";
import { nanoid } from "nanoid";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

const EventFamily = () => {
  const { clanId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.EventSlice.data.items);
  const event = useAppSelector((state) => state.EventByIdReducer.data);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("house");
  const tableHeading = useMemo(
    () => [
      { id: 1, label: "" },
      { id: 2, label: "Nội dung" },
      { id: 3, label: "Thời gian" },
    ],
    []
  );

  const loadData = () => {
    dispatch(
      getEventByClanAsync({
        page: currentPage,
        limit: pageSize,
        clanId: Number(clanId),
        keyword: searchKeyword,
      })
    );
  };
  //

  useEffect(() => {
    loadData();
  }, [clanId, currentPage, pageSize, searchKeyword]);

  return (
    <div>
      {/* <ul className="list group mb-4">
        {events.map((event) => (
          <li key={event.id} className="list-groups-item">
            {event.content}
          </li>
        ))}
      </ul> */}
      <div className="flex gap-4 p-5">
        {events.map((event) => (
          <Card
            hoverable
            style={{ width: "33.33%", height: "auto", objectFit: "cover" }}
            cover={
              <img
                alt={event.title}
                src={event.image[0]}
                className="h-[300px] object-cover"
              />
            }
            onClick={() =>
              navigate(`/event/${clanId}/event-detail/${event.id}`)
            }
          >
            <div className="">
              <h3>{event.title}</h3>
              <p className="line-clamp-3">{event.content}</p>
              <p>{event.timeEvent?.toString()}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventFamily;
