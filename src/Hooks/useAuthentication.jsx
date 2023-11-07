import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from '../Service/action';

const useAuthentication = (route) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthentication = async () => {
      setIsLoading(true);
      
      if (user.id || user.session || localStorage.getItem("supabaseSession")) {
        if (!user.id) {
          const session = localStorage.getItem("supabaseSession");
          console.log(session);
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) {
            localStorage?.removeItem("supabaseSession");
            navigate("/", { replace: true });
            return;
          }
          dispatch(addUser({
            id: user.id,
            username: user.user_metadata.first_name,
            session: session,
          }));

          navigate(route);
        } else {
          navigate(route);
        }
        setIsAuthenticated(true);
      }else{
        navigate("/", {replace:true})
      }

      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  return { isLoading, isAuthenticated };
};

export default useAuthentication;
