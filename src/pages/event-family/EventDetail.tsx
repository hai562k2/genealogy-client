import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEventByClanAsync,
  getEventByIdAsync,
} from "../../store/features/EventSlice";
import DefaultText from "../../components/Text/DefaultText";
import { nanoid } from "nanoid";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import errImg from "../../assets/images/logo.png";

const EventDetailFamily = () => {
  const { clanId, eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const event = useAppSelector((state) => state.EventByIdReducer.data);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("house");

  const loadData = () => {
    dispatch(getEventByIdAsync(Number(eventId)));
  };
  //
  console.log(event);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-5 flex flex-col justify-center items-center">
      {/* <ul className="list group mb-4">
        {events.map((event) => (
          <li key={event.id} className="list-groups-item">
            {event.content}
          </li>
        ))}
      </ul> */}
      <div className="flex items-center gap-2">
        <img
          src={event.user?.image[0]}
          alt={event.user?.name}
          className="w-[90px] h-auto rounded-full"
        />
        <div className="flex flex-col">
          <div>{event.user?.name}</div>
          <div className="text-[#ccc]">{event.timeEvent?.toLocaleString()}</div>
        </div>
      </div>
      <h3> {event.title}</h3>
      <img src="" alt="" />
      <div dangerouslySetInnerHTML={{ __html: event.content }} />
      <div>
        {event.comments.map((eventComment) => (
          <>
            <div className="flex gap-3">
              <img
                src={eventComment.user.image[0] || errImg}
                alt="avatar"
                className="rounded-full w-[50px]"
              />
              <div className="flex flex-col gap-2 items-center">
                <div>
                  <div>{eventComment.createdAt.toLocaleString()}</div>
                  <div key={eventComment.id} className="list-groups-item">
                    {eventComment.user?.name}
                  </div>
                </div>
                <div>{eventComment.content}</div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default EventDetailFamily;
