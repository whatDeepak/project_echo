"use client"
import React, { useState, useEffect } from "react";
import UserProfileAvatar from "@/components/common/UserProfileAvatar";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function UserCommunityProfile({ user }: { user: ShowCommunityType }) {

  return (
    <div className="flex items-center space-x-4 mt-5">
      <div className="self-start">
        <UserProfileAvatar name={user.name} image="" />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-md text-orange-300">@{user.username}</p>
        <h1 className="text-l mt-5">{user.bio}</h1>
      </div>
    </div>
  );
}
