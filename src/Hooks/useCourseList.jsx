import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCourses } from "../Service/action";
import supabase from "../supabaseClient";

const useCourseList = () => {
  const dispatch = useDispatch();
  const [courseLoad, setCourseLoad] = useState();

  useEffect(() => {
    setCourseLoad(true)
    const fetchData = async () => {
      let { data: courses, error } = await supabase.from("courses").select("*");
      courses.forEach((course) => {
        dispatch(addCourses(course));
      });
    };

    fetchData();
    setCourseLoad(false)
  }, []);
  return courseLoad;
};

export default useCourseList;
