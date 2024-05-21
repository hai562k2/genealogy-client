import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEventComment,
  getEventByClanAsync,
  getEventByIdAsync,
} from "../../store/features/EventSlice";
import DefaultText from "../../components/Text/DefaultText";
import { nanoid } from "nanoid";
import { Button, Card, Input } from "antd";
import Meta from "antd/es/card/Meta";
import errImg from "../../assets/images/logo.png";
import { convertDateTime } from "../../utils/helpers";
import { FormAddEventComment } from "../../utils/typeForm";

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
  const [comment, setComment] = useState<string>("");

  const loadData = () => {
    dispatch(getEventByIdAsync(Number(eventId)));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddComment = async () => {
    const params = {
      content: comment,
      eventId: Number(eventId),
    };
    await dispatch(createEventComment(params));
    setComment("");
    loadData();
  };

  return (
    <div className="p-5 flex flex-col justify-center">
      {/* <ul className="list group mb-4">
        {events.map((event) => (
          <li key={event.id} className="list-groups-item">
            {event.content}
          </li>
        ))}
      </ul> */}
      <div className="flex items-center justify-center gap-2">
        <img
          src={event.user?.image[0] || errImg}
          alt={event.user?.name}
          className="w-[90px] h-auto rounded-full"
        />
        <div className="flex flex-col">
          <div>{event.user?.name}</div>
          <div className="text-[#ccc]">
            {convertDateTime(event.timeEvent as Date)}
          </div>
        </div>
      </div>
      <h3 className="text-center">{event.title}</h3>
      <div
        dangerouslySetInnerHTML={{ __html: event.content }}
        className="min-h-[250px] p-2"
      />
      <div className="p-3 bg-[#f7f5f0] rounded-xl">
        <h4>Bình luận - {event.comments.length} bình luận</h4>
        {event.comments.map((eventComment) => (
          <div className="flex gap-3 mt-3">
            <img
              src={eventComment.user.image[0] || errImg}
              alt="avatar"
              className="rounded-full w-[40px] h-[40px]"
            />
            <div
              className="flex flex-1 flex-col gap-2 p-[10px] rounded-[10px] bg-white"
              style={{ border: "1px solid gray" }}
            >
              <div>
                <div className="text-[#ccc] text-xs">
                  {convertDateTime(eventComment.createdAt as Date)}
                </div>
                <div key={eventComment.id} className="list-groups-item text-xs">
                  {eventComment.user?.name}
                </div>
              </div>
              <div>{eventComment.content}</div>
            </div>
          </div>
        ))}
        <div className="flex mt-4 items-center gap-5">
          <Input
            name="comment-content"
            placeholder="Nhập bình luận ..."
            size="large"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <Button
            type="primary"
            size="large"
            onClick={handleAddComment}
            disabled={comment.length > 0 ? false : true}
          >
            Gửi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailFamily;
