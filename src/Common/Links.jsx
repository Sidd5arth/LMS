import Home from "../Pages/Home";
import AuthPage from "../Pages/AuthPage";
import Dashboard from "../Pages/Dashboard";
import CoursePage from "../Pages/CoursePage";

export const Links = [
    {
        name:"Home",
        path:"/Home",
        element:<Home/>,
        showInNavigation: true
    },
    {
        name:"AuthPage",
        path:"/",
        element:<AuthPage/>,
        showInNavigation: true
    },
    {
        name:"Dashboard",
        path:"/dashboard",
        element:<Dashboard/>,
        showInNavigation: true
    },
    {
        name:"Course",
        path:"/coursePage",
        element:<CoursePage/>,
        showInNavigation: true
    },
]