import DyanmicNavBar from "@/components/common/DyanmicNavBar";
import React, { Suspense } from "react";

import { searchCommunity} from "@/lib/serverMethods";
import UserListCard from "@/components/common/UserListCard";
import { Metadata } from "next";
import CommunitySearchBar from "@/components/communities/CommunitySearchBar";
import CommunityMenu from "@/components/common/CommunityMenu";
import CommunityListCard from "@/components/common/CommunityListCard";

export const metadata: Metadata = {
    title: "Communities",
    description: "Explore the communities...",
  };
  
  export default async function Discover({
    searchParams,
  }: {
    searchParams: { [key: string]: string | undefined };
  }) {
    const users: Array<Community> | [] = await searchCommunity(searchParams?.query!);
    return (
      <div>
        <DyanmicNavBar title="Communities" />
        <CommunityMenu title="Discover"/>
        
        <CommunitySearchBar />
  
        <div className="mt-5">
          {users?.length > 0 &&
            users.map((item) => <CommunityListCard community={item} key={item.id} />)}
          {users?.length < 1 && searchParams?.query?.length! > 1 && (
            <div className="text-center">
              <h1 className="font-bold">No User found</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
  