import DyanmicNavBar from "@/components/common/DyanmicNavBar";
import React, { Suspense } from "react";

import { searchUser } from "@/lib/serverMethods";
import UserListCard from "@/components/common/UserListCard";
import { Metadata } from "next";
import CommunitySearchBar from "@/components/communities/CommunitySearchBar";


export const metadata: Metadata = {
    title: "Explore",
    description: "Search users here and show there profile...",
  };
  
  export default async function Communities({
    searchParams,
  }: {
    searchParams: { [key: string]: string | undefined };
  }) {
    const users: Array<User> | [] = await searchUser(searchParams?.query!);
    return (
      <div>
        <DyanmicNavBar title="Communities" />
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
  