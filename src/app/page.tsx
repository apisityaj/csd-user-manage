"use client";
import React, { useState } from "react";
import NavBar from "@/app/_component/navbars/navbar";
import UserListTable from "@/app/_component/user/user-list-table";
import axios from "axios";

import authGuard from "@/app/_component/authentication/auth-guard";

function Home() {
  // const getUserList = async () => {
  //   const responseUser = await axios.get("");
  // };

  return (
    <div>
      <NavBar />
      <div className="flex-1 max-w-screen-xl mx-auto">
        <UserListTable />
      </div>
    </div>
  );
}

export default authGuard(Home);
