// src/reducers/reducer.js
import { combineReducers } from "redux";
import {
  ADD_COURSE,
  ADD_USER
} from "./action";

const initialUserState = {
  id: '', 
  username:"",
  session: "",
  course: []
};

export function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}

const initialCourseListState = [];
export function courseListReducer(state = initialCourseListState, action) {
  switch (action.type) {
    case ADD_COURSE:
      const existingCourseIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingCourseIndex !== -1) {
        const updatedCourseList = [...state];
        updatedCourseList[existingCourseIndex] = action.payload;
        return updatedCourseList;
      } else {
        return [...state, action.payload];
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user: userReducer,
  courseList: courseListReducer,
});

export default rootReducer;
