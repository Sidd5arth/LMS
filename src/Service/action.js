export const ADD_COURSE = 'ADD_COURSE';
export const ADD_USER = 'ADD_USER';

export const addCourses = (course) => ({
  type: ADD_COURSE,
  payload: course,
});
export const addUser = (user) => ({
  type: ADD_USER,
  payload: user
});
