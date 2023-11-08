import React from "react";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { toast } from "react-hot-toast";
import useAuthentication from "../Hooks/useAuthentication";
import useCourseList from "../Hooks/useCourseList";
import { useCallback } from "react";

const Dashboard = () => {
  useCourseList();
  const { isloading } = useAuthentication("/dashboard");
  const allCourses = useSelector((state) => state.courseList);
  const user = useSelector((state) => state.user);
  const [userCourseData, setUserCourseData] = useState(null);
  const [pageData, setPageData] = useState(false);

  const fetchCourseData = useCallback(async () => {
    const { data, error } = await supabase
      .from("user")
      .select("course")
      .eq("user_id", user.id);
    let array = data[0]?.course;
    if (array.length === 0) {
      setPageData(true);
      return;
    } else {
      setPageData(false);
    }

    if (!error) {
      let courseData = [];
      for (let i = 0; i < allCourses.length; i++) {
        if (array.includes(allCourses[i].id)) {
          courseData.push(allCourses[i]);
        }
      }
      setUserCourseData(courseData);
    } else {
      toast.error(error);
    }
  }, [user.id, allCourses, setUserCourseData]);

  useEffect(() => {
    if (user.id !== "") {
      fetchCourseData();
    }
  }, [user.id, fetchCourseData]);

  return (
    <div>
      <Navbar />
      {pageData ? (
        <div className="flex justify-center align-middle">
          No History, Plaese Enroll in a course
        </div>
      ) : (
        <>
          {isloading || userCourseData === null ? (
            <div className="flex justify-center align-middle">
              Loading enrolled Courses...
            </div>
          ) : (
            <div className="p-12">
              <div className="flex items-center mb-8">
                <div className="mr-4">
                  <img
                    src={user.image}
                    alt="User Name"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold">{user.username}</h1>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <h1 className="text-2xl font-semibold">My Enrolled Courses</h1>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {userCourseData?.map((course) => (
                  <li
                    key={course.id}
                    className="border border-black rounded-md p-4"
                  >
                    {/* <img
                src={course.thumbnail}
                alt={course.name}
                className="w-full h-32 object-cover rounded-md"
              /> */}
                    <div className="flex justify-between">
                      <h2 className="mt-2 text-xl font-semibold">
                        {course.name}
                      </h2>
                      <div className="flex flex-col justify-end text-right">
                        <input className="ms-10" type="checkbox"></input>
                        <p className="text-xs">Mark <br/>complete</p>
                      </div>
                    </div>
                    <p className="text-gray-600">{course.instructor}</p>
                    <p className="text-gray-600">Due Date: 19/01/2024</p>
                    <div className="mt-4">
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                              Progress
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-purple-500">
                              50% complete
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                          <div
                            style={{ width: "50%" }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
