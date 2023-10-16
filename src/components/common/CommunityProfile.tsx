"use client"
import React, { useState, useEffect } from "react";
import UserProfileAvatar from "@/components/common/UserProfileAvatar";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function CommunityProfile({ user }: { user: ShowCommunityType }) {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  const toggleFollowStatus = (status: "follow" | "unfollow") => {
    axios
      .post("/api/follow", {
        user_id: user.id,
        status,
      })
      .then((res) => {
        if (res.status === 200) {
          setIsFollowing(status === "follow");
        } else {
          console.error(`Error ${status}ing user: Server returned status ${res.status}`);
          // You can also log the response data for further debugging
          console.error(res.data);
        }
      })
      .catch((err) => {
        console.error(`Error ${status}ing user:`, err);
      });
  };
  
  // Fetch and set initial follow status when the component mounts
  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        // Make an API request to check if the user is following the target user
        const response = await axios.get(`/api/follow/${user.id}`);
        if (response.status === 200) {
          setIsFollowing(response.data.data.followStatus === "true");
        }
      } catch (error) {
        console.error("Error fetching follow status:", error);
        setIsFollowing(false); // Assume not following on error
      }
    };

    fetchFollowStatus();
  }, [user.id]);

  return (
    <div className="flex items-center space-x-4 mt-5">
      <div className="self-start">
        <UserProfileAvatar name={user.name} image="" />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-md text-orange-300">@{user.username}</p>
        <h1 className="text-xl">{user.email}</h1>
        {isFollowing !== null ? (
          <Button
            className="mt-10 w-32"
            size="lg"
            onClick={() =>
              toggleFollowStatus(isFollowing ? "unfollow" : "follow")
            }
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
