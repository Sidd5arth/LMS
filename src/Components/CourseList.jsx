import React from "react";
import { useSelector } from "react-redux";
import EmailCard from "./CourseCard";
import CourseCard from "./CourseCard";

const CourseList = ({searchQuery}) => {
  const allCourses = useSelector((state) => state.courseList);

  const filteredCourses = allCourses.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
    { filteredCourses.length > 0 ?
    <div
    className="overflow-y-scroll h-[88vh] px-12 py-2 flex-col"
    >
      {filteredCourses.map((item) => {
        return (
          <CourseCard
            key={item.id}
            id={item.id}
            name={item.name}
            desc={item.description}
            syllabus={item.syllabus}
            number={item.students?.length}
            status={item.enrollmentStatus}
            instructor={item.instructor}
            image={item.thumbnail}
            fav={true}
          />
        );
      })}
    </div>
    : <div className="flex justify-center align-middle">No matched Course</div>
    }
    </>
  );
};

export default CourseList;
