import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { Circles } from "react-loader-spinner";
import supabase from "../supabaseClient";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser } from "../Service/action";
import useAuthentication from "../Hooks/useAuthentication";

const AuthPage = () => {
  useAuthentication("/Home")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState();

  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const onSubmit = async (val) => {
    try {
      setIsLoading(true);
      localStorage.removeItem("supabaseSession");
      if (isLogin) {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: val.loginEmail,
            password: val.loginPassword,
          });
          if (data.user) {
            localStorage.setItem("supabaseSession", data.session.access_token);

            dispatch(addUser({
              id: data.user.id,
              username: data.user.user_metadata.first_name,
              session: data.session.access_token,
            }));
            toast.success("Logged in!");
            navigate("/Home", { replace: true });
            setIsLogin(false);
          } else {
            toast.error("Invalid details Please Register or try again");
            setIsLogin(false);
          }
        } catch (err) {
          toast.error("somthing went wrong!");
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: val.registerEmail,
          password: val.registerPassword,
          options: {
            data: {
              first_name: val.registerUsername,
            },
          },
        });
        if (!error) {
          const { data: createdUser, error: dbError } = await supabase
            .from("user")
            .insert([
              {
                user_id: data.user?.id,
                username: val.registerUsername,
                email: data.user?.email,
              },
            ]);
          if (dbError) {
            toast.error(dbError.message);
          } else {
            toast.success("Registered!");
            setIsLogin(true);
          }
        } else toast.error(error.message);
      }
    } catch (err) {
      toast.success("invalid credentials");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-[400px] z-20 my-40 mx-auto p-12 transition-all ms-0.3 ease-in-out border border-black rounded-lg">
      <div className="flex justify-center mb-4 w-full transition-all ms-0.3 ease-in-out">
        <button
          className={`w-full py-2 px-4 rounded-tl-lg transition-all ms-0.3 ease-in-out ${
            isLogin
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-700"
          }`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`w-full py-2 px-4 rounded-tr-lg transition-all ms-0.3 ease-in-out ${
            !isLogin
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-700"
          }`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            id="email"
            placeholder="Email"
            className={`w-full border border-black rounded-lg p-2 ${
              errors[isLogin ? "loginEmail" : "registerEmail"]
                ? "border-red-500"
                : ""
            }`}
            {...register(isLogin ? "loginEmail" : "registerEmail", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors[isLogin ? "loginEmail" : "registerEmail"] && (
            <p className="text-red-500">Email is required</p>
          )}
          <input
            type="password"
            id="password"
            placeholder="Password"
            className={`w-full border border-black rounded-lg p-2 ${
              errors[isLogin ? "loginPassword" : "registerPassword"]
                ? "border-red-500"
                : ""
            }`}
            {...register(isLogin ? "loginPassword" : "registerPassword", {
              required: true,
              minLength: 6,
            })}
          />
          {errors[isLogin ? "loginPassword" : "registerPassword"] && (
            <p className="text-red-500 text-sm">
              Password must be at least 6 characters long
            </p>
          )}

          {!isLogin && (
            <input
              type="text"
              id="username"
              placeholder="Username"
              className={`w-full border border-black rounded-lg p-2 ${
                errors[isLogin ? "loginPassword" : "registerPassword"]
                  ? "border-red-500"
                  : ""
              }`}
              {...register("registerUsername", { required: true })}
            />
          )}

          {isLoading ? (
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
              <Circles color="white" width={"24px"} height={"24px"} />
            </button>
          ) : (
            <button
              type="submit"
              className="border-2 border-blue-300 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg shadow-blue-200"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
