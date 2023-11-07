import React from "react";
import { getRandomLightColor } from "../utility/randomColor";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CourseCard = ({
  id,
  name,
  desc,
  instructor,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/coursePage?id=${id}`);
  };
  const randomColor = getRandomLightColor();

  return (
    <div
      onClick={handleClick}
      className="h-[140px] w-full border border-black rounded-lg mb-5 p-6 flex gap-6 cursor-pointer"
    >
      <div
        style={{
          width: "60px",
          height: "59px",
          backgroundColor: randomColor,
        }}
      ></div>
      <div className="w-full h-full flex justify-between gap-6 text-sm">
        <div>
          <p>
            <span style={{ color: "#666666" }}>
              <b>Course:</b>
            </span>{" "}
            {name}
          </p>
          <p style={{ color: "#333" }}>{desc}</p>
          <p>
            <span style={{ color: "#666666" }}>instructor:</span> {instructor}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
