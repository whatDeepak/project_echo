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
  
  export default async function Communities({
    searchParams,
  }: {
    searchParams: { [key: string]: string | undefined };
  }) {
    const users: Array<User> | [] = await searchUser(searchParams?.query!);
    return (
      <div>
        <DyanmicNavBar title="Communities" />
        <CommunityMenu title="ForYou"/>

      </div>
    );
  }
  