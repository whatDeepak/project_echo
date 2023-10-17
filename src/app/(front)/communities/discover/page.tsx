import DyanmicNavBar from "@/components/common/DyanmicNavBar";
import React, { Suspense } from "react";

import { searchUser } from "@/lib/serverMethods";
import UserListCard from "@/components/common/UserListCard";
import { Metadata } from "next";
import CommunitySearchBar from "@/components/communities/CommunitySearchBar";
import CommunityMenu from "@/components/common/CommunityMenu";

export const metadata: Metadata = {
    title: "Communities",
    description: "Explore the communities...",
  };
  
  export default async function Discover({
    searchParams,
  }: {
    searchParams: { [key: string]: string | undefined };
  }) {
    const users: Array<User> | [] = await searchUser(searchParams?.query!);
    return (
      <div>
        <DyanmicNavBar title="Communities" />
        <CommunityMenu />
        
        <CommunitySearchBar />
  
        <div className="mt-5">
          {users?.length > 0 &&
            users.map((item) => <UserListCard user={item} key={item.id} />)}
          {users?.length < 1 && searchParams?.query?.length! > 1 && (
            <div className="text-center">
              <h1 className="font-bold">No User found</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
  