import React from "react";

const Button = ({ type, name, handleClick, disable }) => {
  const handleBtnClick = (e) => {
      handleClick(e);
  }

  return (
    <div>
      <button
        onClick={handleBtnClick}
        disabled={disable}
        style={{
          padding: "0.5em",
          width: "7em",
          borderRadius: "1em",
          border: "0.5px solid #333",
          backgroundColor: type === "enroll" ? "lightgreen" : "",
          color: type === "fav" ? "white" : "",
          cursor: "pointer",
        }}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
