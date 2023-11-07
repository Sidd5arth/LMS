import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import supabase from "../supabaseClient";
import Navbar from "../Components/Navbar";
import { toast } from "react-hot-toast";
import ChapterCard from "../Components/ChapterCard";
import Accordion from "../Components/Accordion";
import { getRandomLightColor } from "../utility/randomColor";
import Button from "../Components/Button";
import { useSelector } from "react-redux";
import useAuthentication from "../Hooks/useAuthentication";

const CoursePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); 
  const id = searchParams.get("id");
  const {isloading} = useAuthentication(`/coursePage?id=${id}`)
  const user = useSelector((state) => state.user);
  const [pageLoader, setPageLoader] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const randomColor = getRandomLightColor();

  useEffect(() => {
    const fetchCourseData = async () => {
      setPageLoader(true);
      const { data, error } = await supabase
        .from("courses")
        .select()
        .eq("id", id);
      if (!error) {
        setPageData(data[0]);
      } else {
        toast.error(error);
      }
    };
    fetchCourseData();
    setPageLoader(false);
  }, []);

  const handleClick = async () => {
    const { data, error } = await supabase
      .from("user")
      .select("course")
      .eq("user_id", user.id);
    let array = data[0]?.course;
    if (!array.includes(id)) {
      array.push(id);
      await supabase
        .from("user")
        .update({ course: array })
        .eq("user_id", user.id);
    }else{
      setEnrolled(true);
    }
  };
  return (
    <>
      {pageLoader && isloading ? (
        <div className="flex justify-center align-middle">Loading...</div>
      ) : (
        <div>
          <Navbar />
          <div className="w-full px-12 flex flex-col md:flex-row">
            <div className="w-full md:w-9/12">
              <h1 className="bg-red text-5xl mb-3">{pageData?.name}</h1>
              <div
                style={{ backgroundColor: randomColor }}
                className="h-[250px] md:h-[500px] "
              ></div>
            </div>
            <div className="w-full md:w-3/12 h-full bg-red text-right">
              <h1 className="bg-red text-lg align"> Chapter wise</h1>
              <h1 className="bg-red text-sm mb-3">
                {pageData?.duration} study plan
              </h1>
              <div className="overflow-y-scroll h-[250px] md:h-[500px]">
                {(() => {
                  let chapters = [];
                  for (let i = 0; i < 10; i++) {
                    chapters.push(<ChapterCard chapter={i} />);
                  }
                  return chapters;
                })()}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between align-middle">
            <div className="px-12 flex-col justify-between align-middle mt-2">
              <p className="text-2xl py-4 ">
                Course by: {pageData?.instructor}
              </p>
              <p className="flex gap-2 py-4 text-xs">
                • Prerequisites :{" "}
                {pageData?.prerequisites?.map((require) => (
                  <span
                    style={{ backgroundColor: randomColor }}
                    className="rounded-lg p-3 py-1 opacity-30 border"
                  >
                    <b>{require}</b>
                  </span>
                ))}
              </p>
              <div className="flex gap-10">
                <p className="flex gap-2 py-4 text-xs">
                  • Duration : {pageData?.duration}
                </p>
                <p className="flex gap-2 py-4 text-xs">
                  • Location : {pageData?.location}
                </p>
              </div>
            </div>
            <div className="p-12">
              <span>Status: </span>
              <span className="text-purple-600">
                {pageData?.enrollmentStatus}
              </span>
              <Button
                name={enrolled ? "Already enrolled" : "enroll Now"}
                type="enroll"
                disable={enrolled}
                handleClick={handleClick}
              />
            </div>
          </div>
          <Accordion syllabus={pageData?.syllabus} />
        </div>
      )}
    </>
  );
};

export default CoursePage;
