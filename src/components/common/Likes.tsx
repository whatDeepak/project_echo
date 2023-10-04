"use client"
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";

export default function Followers({ post} : {post : PostType} ) {
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    // Fetch follow counts from the backend API
    Axios.get(`/api/like/count/${post.id}`)
      .then((response) => {
        const likeCount = response.data.data.likes;
        setLikeCount(likeCount);
        
      })
      .catch((error) => {
        console.error("Error fetching like counts:", error);
      });
  }, [post]);

  return (
    <div>
      <span className="font-light ml-3">{likeCount} Likes</span>
    </div>
  );
}
