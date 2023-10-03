"use client"
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";

export default function Followers({ user } : {user : CustomUser}) {
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    // Fetch follow counts from the backend API
    Axios.get(`/api/follow/count/${user}`)
      .then((response) => {
        const followerCount = response.data.data.followers;
        const followingCount = response.data.data.following;
        setFollowerCount(followerCount);
        setFollowingCount(followingCount);
      })
      .catch((error) => {
        console.error("Error fetching follow counts:", error);
      });
  }, [user]);

  return (
    <div>
      <p className="text-md mt-10 ml-24">
        {followerCount} Followers | {followingCount} Following
      </p>
    </div>
  );
}
