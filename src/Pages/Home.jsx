import React, { useState } from "react";
import useCourseList from "../Hooks/useCourseList";
import Navbar from "../Components/Navbar";
import CourseList from "../Components/CourseList";
import useAuthentication from "../Hooks/useAuthentication";

function Home() {
  const { isloading } = useAuthentication("/Home");
  const [searchQuery, setSearchQuery] = useState("");
  const courseLoader = useCourseList();

  return (
    <>
      {isloading ? (
        <div className="flex align-middle justify-center">Loading...</div>
      ) : (
        <div className="bg-gray overflow-y-scroll h-full">
          <Navbar
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            type="home"
          />
          {courseLoader ? (
            <div className="flex align-middle justify-center">Loading...</div>
          ) : (
            <CourseList searchQuery={searchQuery} />
          )}
        </div>
      )}
    </>
  );
}

export default Home;
