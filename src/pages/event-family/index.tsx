import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useNavigate, useParams } from "react-router-dom";
import { getEventByClanAsync } from "../../store/features/EventSlice";
import DefaultText from "../../components/Text/DefaultText";
import { nanoid } from "nanoid";
import { Card, Pagination, PaginationProps } from "antd";
import Meta from "antd/es/card/Meta";
import { convertDateTime } from "../../utils/helpers";
import errImg from "../../assets/images/logo.png";

const EventFamily = () => {
  const { clanId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.EventSlice.data);
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

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
  };

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
      {events.items.map((event) => (
        <div
          className="flex gap-4 items-center cursor-pointer hover:opacity-80"
          onClick={() => navigate(`/event/${clanId}/event-detail/${event.id}`)}
        >
          <img
            alt={event.title}
            src={event.image[0] || errImg}
            className="h-[150px] object-cover"
          />
          <div className="flex flex-col">
            <h3 className="line-clamp-1">{event.title}</h3>
            <p className="line-clamp-2 mt-3">{event.content}</p>
            <p className="mt-4 text-xs text-[#ccc]">
              {convertDateTime(event.timeEvent as Date)}
            </p>
          </div>
        </div>
      ))}
      <Pagination
        current={currentPage}
        onChange={onChange}
        total={events.total}
        defaultPageSize={pageSize}
      />
    </div>
  );
};

export default EventFamily;
