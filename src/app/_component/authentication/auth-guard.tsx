"use client";

import React, { useEffect, ComponentType } from "react";
import axios from "axios"; // ใช้เรียก API

type Props = {
  // กำหนด props ตามที่ต้องการ
};

const authGuard = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthGuardComponent: React.FC<P> = (props) => {
    const checkAuthentication = async () => {
      try {
        // ดึงค่า accessToken จาก local storage
        const accessToken = window.localStorage.getItem("accessToken");
        console.log('NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL)
      if (accessToken) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + accessToken;
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/user-management/search/role?id=1101700272371`
          );
          console.log("response", response);
        } else {
          console.log("ไม่มี Token");
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบการตรวจสอบสิทธิ์:", error);
      }
    };

    useEffect(() => {
      checkAuthentication();

      return () => {
        // ล้าง token ใน header หลังจาก Component ถูก unmount
        delete axios.defaults.headers.common["Authorization"];
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthGuardComponent;
};

export default authGuard;
