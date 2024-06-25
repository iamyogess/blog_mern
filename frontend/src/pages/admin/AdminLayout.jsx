import React from "react";
import Header from "./components/header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getUserProfile } from "./../../services/index/users";
import { toast } from 'react-hot-toast';

const AdminLayout = () => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
    onSuccess: (data) => {
      if(!data.admin){
        navigate("/");
        toast.error("You are not allowed to access admin panel!");
      }
    },
    onError:(error) => {
      console.log(error);
      toast.error("You are not allowed to access admin panel!");
    }
  });

  if(isLoading){
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h3 className="text-2xl text-slate-700">Loading....</h3>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen lg:flex-row">
      <Header />
      <main className="bg-[#F9F9F9] flex-1 p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
