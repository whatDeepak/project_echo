"use client";

import React, { useEffect, useState } from "react";
import PostUserBar from "./PostUserBar";
import Env from "@/config/env";
import AddComment from "../threads/AddComment";
import Link from "next/link";
import { Heart } from "lucide-react";
import ShareModal from "./ShareModal";
import ImageViewer from "./ImageViewer";
import axios from "axios";
import Likes from "./Likes";

export default function PostCard({
  post,
  noRedirect,
  isAuthPost,
}: {
  post: PostType;
  noRedirect?: boolean;
  isAuthPost?: boolean;
}) {
  const [isLiked, setIsLiked] = useState<string>("0"); // Initialize with "0" (not liked)

  const likeDislike = (status: string) => {
    // Only make the API call if the status has changed
    if (status !== isLiked) {
      axios
        .post("/api/like", {
          status,
          post_id: post.id,
          toUserId: post.user_id,
        })
        .then((res) => {
          if (res.status === 200) {
            setIsLiked(status);
            // Handle success, if needed
            // You can also update the like count or other UI elements here
          } else {
            console.error(`Error ${status === "1" ? "liking" : "disliking"} post: Server returned status ${res.status}`);
            // You can also log the response data for further debugging
            console.error(res.data);
            // If the request fails, revert the state to the previous value
            setIsLiked(isLiked === "1" ? "0" : "1");
          }
        })
        .catch((err) => {
          console.error(`Error ${status === "1" ? "liking" : "disliking"} post:`, err);
          // If the request fails, revert the state to the previous value
          setIsLiked(isLiked === "1" ? "0" : "1");
        });
    }
  };
  

  useEffect(() => {
    let fetchLikeStatus = async () => {
      try {
        // Make an API request to check if the user has liked the post
        const response = await axios.get(`/api/like/${post.id}`);
        if (response.status === 200) {
          setIsLiked(response.data.data.likedStatus === "1" ? "1" : "0");
        }
      } catch (error) {
        console.error("Error fetching like status:", error);
        setIsLiked("0"); // Assume not liked on error
      }
    };

    fetchLikeStatus();
  }, [post.id]);

  return (
    <div className="mb-5">
      <PostUserBar post={post} isAuthPost={isAuthPost} />
      <div className="ml-12 mt-[-10px]">
        <Link href={noRedirect == true ? "#" : `/post/${post.id}`}>
          {post.content}
        </Link>
        {post?.image ? <ImageViewer image={post.image} /> : <></>}
        <div className="mt-5 flex items-center">
          {post.Likes.length > 0 || isLiked === "1" ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-red-500 cursor-pointer"
              onClick={() => likeDislike(isLiked === "1" ? "0" : "1")}
            >
              <path
                d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          ) : (
            <Heart
              width={20}
              height={20}
              onClick={() => likeDislike("1")}
              className="cursor-pointer"
            />
          )}

          <AddComment post={post} />
          <ShareModal url={`${Env.APP_URL}/post/${post.id}`} />
        </div>
        <div className="mt-2 flex item-center">
          <span className="font-light">{post.comment_count} Replies</span>
          <span className="font-light ml-3">|</span>
          <Likes post={post}/>
        </div>
      </div>
    </div>
  );
}

