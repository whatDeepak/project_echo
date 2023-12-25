import DyanmicNavBar from "@/components/common/DyanmicNavBar";
import UserProfileAvatar from "@/components/common/UserProfileAvatar";
import { fetchCommunities, fetchCommunity, fetchCommunityPosts, fetchUser } from "@/lib/serverMethods";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/common/PostCard";
import CommentCard from "@/components/common/CommentCard";
import { Button } from "@/components/ui/button";
import CommunityProfile from "@/components/common/CommunityProfile";

export default async function ShowCommunity({ params }: { params: { id: number } }) {
  const user: ShowCommunityType | undefined = await fetchCommunity(params.id);
  const posts: Array<PostType> | [] = await fetchCommunityPosts(params.id);

  return (
    <div>
      <DyanmicNavBar title="Show Community" />
      <div>
      {user && (
          <CommunityProfile
            user={user}
          />
        )}
        <div className="mt-10 ">
          <Tabs defaultValue="post" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="post" className="w-full">
                Posts
              </TabsTrigger>
              <TabsTrigger value="comment" className="w-full">
                Comments
              </TabsTrigger>
            </TabsList>
            <TabsContent value="post">
              <div className="mt-5">
                {posts &&
                  posts.map((item) => <PostCard post={item} />)}
                {posts && posts.length < 1 && (
                  <h1 className="text-center mt-5">No Post found</h1>
                )}
              </div>
            </TabsContent>
            <TabsContent value="comment">
              <div className="mt-5">
                {user?.Comment &&
                  user.Comment.map((item) => <CommentCard comment={item} />)}

                {user?.Comment && user.Comment.length < 1 && (
                  <h1 className="text-center mt-5">No Comment found</h1>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
