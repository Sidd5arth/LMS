import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setSearchQuery, type}) => {
  const [input, setInput] = useState();
  const navigate = useNavigate();
  const handleNav = (route) => {
    navigate(route);
  };
  return (
    <div className="flex flex-col gap-4 py-6 px-12 justify-between w-full md:flex-row">
      <div className="flex gap-4 ">
        <Button handleClick={() => handleNav("/Home")} type="Home" name="Home" />
        <Button
          handleClick={() => handleNav("/dashboard")}
          type="dashboard"
          name="dashboard"
        />
      </div>
      {type === "home" && (
        <div className="md:flex">
          <input
            type="text"
            placeholder="Search by instructor or course name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full py-2 px-3 md:mx-2 md:my-0 my-2 border border-black rounded-lg"
          />
          <Button name="search" handleClick={() => setSearchQuery(input)} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
