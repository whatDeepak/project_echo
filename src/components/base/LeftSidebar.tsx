"use client";
import React from "react";
import Image from "next/image";
import SideBarLinks from "../common/SideBarLinks";

export default function LeftSidebar() {
  return (
    <div className="h-screen border-r-2 md:w-1/4 lg:pt-5 pl-12 md:pt-5 hidden md:block">
      <div className="flex justify-start items-center">
        <Image src="/images/echologo.svg" width={50} height={50} alt="logo" />
        <h1 className="font-bold text-xl ml-2">Echo</h1>
      </div>
      <SideBarLinks />
    </div>
  );
}
