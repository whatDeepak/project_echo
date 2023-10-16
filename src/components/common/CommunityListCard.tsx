import React from "react";
import UserAvatar from "./UserAvatar";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CommunityListCard({ community }: { community: Community }) {
  return (
    <div className="w-full shadow-sm  p-4 rounded-md mb-3">
      <div className="flex">
        <UserAvatar name={community.name} image={community.image} />
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col">
            <strong className="text-md font-bold ml-2">{community.name}</strong>
            <span className="ml-2 font-light text-xs">@{community.username}</span>
          </div>
          <Link href={`/communities/${community.id}`}>
            <Button size="sm">View</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
