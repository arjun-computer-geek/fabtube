import React from "react";
import { Link } from "react-router-dom";
import "./suggestionVideoCard.css";

export const SuggestionVideoCard = ({
  thumbnail,
  ProfilePic,
  title,
  chanel,
  views,
  createdAt,
}) => {
  return (
    <div className="suggestion-video-card">
      <div className="thumbnail">
        <img src={thumbnail} alt="thumnail" />
      </div>
      <div className="title-wrapper">
        <h2 className="title">{title}</h2>
        <Link to="#" className="video-card-chanel-name">
          {chanel}
        </Link>
        <span className="views">{views} views. </span>
        <span className="created-time">{createdAt} ago</span>
      </div>
    </div>
  );
};